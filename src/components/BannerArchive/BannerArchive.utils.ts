import { createContext, useContext } from "react";
import { matchSorter } from "match-sorter";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { Banner, BannerOption } from "@/types/banner";

export function isCurrentBanner(banner: Banner) {
    const start = new DateObject(banner.start).createDateObject();
    const end = new DateObject(banner.end).createDateObject();
    return DateObject.inRange(start, end);
}

export function isFutureBanner(banner: Banner) {
    return (
        new DateObject(banner.start).date.getTime() - new Date().getTime() > 0
    );
}

export function getBannerLabel(banner: Banner, hideVersionLabel = false) {
    let version, phase;
    let b = banner.version.split(".");
    if (banner.version.startsWith("Luna")) {
        [version, phase] = b;
    } else {
        version = b.slice(0, 2).join(".");
        phase = b[2];
    }
    const versionLabel = `${version} Phase ${phase}`;

    const start = new DateObject(banner.start).string;
    const end = new DateObject(banner.end).string;
    const dateRange = `${start} — ${end}`;

    return hideVersionLabel ? dateRange : `${versionLabel}: ${dateRange}`;
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

export const BannerCharactersContext = createContext<BannerOption[]>([]);
export const BannerWeaponsContext = createContext<BannerOption[]>([]);

export function useBannerCharacters() {
    return useContext(BannerCharactersContext);
}
export function useBannerWeapons() {
    return useContext(BannerWeaponsContext);
}
