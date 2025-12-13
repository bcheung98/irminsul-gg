import { createContext, useContext } from "react";
import { matchSorter } from "match-sorter";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { Banner, BannerOption } from "@/types/banner";
import { Game, Server } from "@/types";

export function getVersionDates(banner: Banner, server: Server, game?: Game) {
    let versionStart = banner.start;
    let versionEnd = banner.end;
    if (game === "uma" && server === "Asia") {
        versionStart = `${banner.startJP}`;
        versionEnd = `${banner.endJP}`;
    }
    return { versionStart, versionEnd };
}

export function isCurrentBanner(banner: Banner, server: Server, game?: Game) {
    const { versionStart, versionEnd } = getVersionDates(banner, server, game);
    const start = new DateObject(versionStart, server, game).date;
    const end = new DateObject(versionEnd, server).date;
    return DateObject.inRange(start, end);
}

export function isFutureBanner(banner: Banner, server: Server, game?: Game) {
    const { versionStart } = getVersionDates(banner, server, game);
    return new DateObject(versionStart, server, game).checkDate === 1;
}

export function getBannerLabel(
    banner: Banner,
    server?: Server,
    info?: "version" | "date" | undefined
) {
    let game: Game | undefined;
    let version, phase;
    let versionLabel = "";
    if (banner.version) {
        let b = banner.version.split(".");
        if (banner.version.startsWith("Luna")) {
            [version, phase] = b;
        } else {
            version = b.slice(0, 2).join(".");
            phase = b[2];
        }
        versionLabel = `${version} Phase ${phase}`;
    } else if ("startJP" in banner) {
        game = "uma";
        if (banner.id % 2) versionLabel = "Support Card Scout";
        else versionLabel = "Trainee Scout";
    }

    const { versionStart, versionEnd } = getVersionDates(
        banner,
        server || "NA",
        game
    );
    const start = new DateObject(versionStart, server, game).string;
    const end = new DateObject(versionEnd, server).string;
    const dateRange = `${start} — ${end}`;

    if (info === "date") return dateRange;
    else if (info === "version") return versionLabel;
    else return `${versionLabel}: ${dateRange}`;
}

export function filterOptions(options: BannerOption[], searchValue: string) {
    options = options.sort(
        (a, b) =>
            (a.category || "").localeCompare(b.category || "") ||
            sortBy(a.rarity, b.rarity) ||
            a.displayName.localeCompare(b.displayName)
    );
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["displayName", "name"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
}

export const BannerDataContext = createContext<{
    characters: BannerOption[];
    weapons: BannerOption[];
    server: Server;
}>({ characters: [], weapons: [], server: "NA" });

export function useBannerData() {
    return useContext(BannerDataContext);
}
