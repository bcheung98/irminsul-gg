import { sortBy } from "@/utils";
import DateObject from "./dates";
import {
    getVersionDates,
    isCurrentBanner,
    isFutureBanner,
} from "@/components/BannerArchive/BannerArchive.utils";
import { Game, Server, SortOrder } from "@/types";
import { Banner, BannerOption, BannerProps } from "@/types/banner";

export function filterBanners(
    banners: Banner[],
    values: BannerOption[],
    unique: boolean,
    sortDirection: SortOrder,
    game: Game,
    server: Server,
) {
    let items = [...banners];
    if (values.length > 0) {
        items = items.filter((banner) => {
            function filterFn(item: BannerOption) {
                const rateUps = banner.rateUps.map((item) => item);
                return rateUps.includes(item.name) || rateUps.includes(item.id);
            }
            return unique ? values.every(filterFn) : values.some(filterFn);
        });
    }
    return sortBanners(items, game, server, sortDirection === "desc");
}

export function sortBanners(
    banners: Banner[],
    game: Game,
    server: Server,
    reverse = false,
) {
    return banners.sort((a, b) => {
        const ai = getVersionDates(a, server, game).versionStart;
        const bi = getVersionDates(b, server, game).versionStart;
        return (
            sortBy(
                new DateObject(ai).date.getTime(),
                new DateObject(bi).date.getTime(),
                reverse,
            ) || sortBy(a.id, b.id, reverse)
        );
    });
}

export function getBannerGroups(
    game: Game,
    server: Server,
    banners: BannerProps,
) {
    const {
        character: characterBanners,
        weapon: weaponBanners,
        chronicled: chronicledBanners,
    } = banners;

    function filterUmaBanner(banner: Banner) {
        if (game === "uma" && server === "NA") {
            return banner.start !== "";
        }
        return true;
    }

    function filterCurrentBanners(banners: Banner[]) {
        return banners
            .filter(filterUmaBanner)
            .filter((banner) => isCurrentBanner(banner, server, game));
    }

    function filterFutureBanners(banners: Banner[]) {
        return banners
            .filter(filterUmaBanner)
            .filter((banner) => isFutureBanner(banner, server, game));
    }

    const currentCharacterBanners = filterCurrentBanners(characterBanners);
    const currentWeaponBanners = filterCurrentBanners(weaponBanners);
    const currentChronicledBanners = chronicledBanners
        ? filterCurrentBanners(chronicledBanners)
        : undefined;

    const futureCharacterBanners = filterFutureBanners(characterBanners);
    const futureWeaponBanners = filterFutureBanners(weaponBanners);
    const futureChronicledBanners = chronicledBanners
        ? filterFutureBanners(chronicledBanners)
        : undefined;

    const activeBanners =
        currentCharacterBanners.length > 0 ||
        currentWeaponBanners.length > 0 ||
        (currentChronicledBanners?.length ?? 0) > 0;

    const futureBanners =
        futureCharacterBanners.length > 0 ||
        futureWeaponBanners.length > 0 ||
        (futureChronicledBanners?.length ?? 0) > 0;

    return {
        currentCharacterBanners,
        currentWeaponBanners,
        currentChronicledBanners,
        futureCharacterBanners,
        futureWeaponBanners,
        futureChronicledBanners,
        activeBanners,
        futureBanners,
    };
}
