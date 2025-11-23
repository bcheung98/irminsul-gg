import { createContext, useContext } from "react";
import { matchSorter } from "match-sorter";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { Banner, BannerOption } from "@/types/banner";
import { Game, Server } from "@/types";

export function isCurrentBanner(banner: Banner, server: Server, game?: Game) {
    const start = new DateObject(banner.start, server, game).date;
    const end = new DateObject(banner.end, server).date;
    return DateObject.inRange(start, end);
}

export function isFutureBanner(banner: Banner, server: Server, game?: Game) {
    return new DateObject(banner.start, server, game).checkDate === 1;
}

export function getBannerLabel(
    banner: Banner,
    server?: Server,
    info?: "version" | "date" | undefined
) {
    let version, phase;
    let b = banner.version.split(".");
    if (banner.version.startsWith("Luna")) {
        [version, phase] = b;
    } else {
        version = b.slice(0, 2).join(".");
        phase = b[2];
    }
    const versionLabel = `${version} Phase ${phase}`;

    const start = new DateObject(banner.start, server).string;
    const end = new DateObject(banner.end, server).string;
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
