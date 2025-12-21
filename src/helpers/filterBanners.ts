import { sortBy } from "@/utils";
import DateObject from "./dates";
import { Game, Server, SortOrder } from "@/types";
import { Banner, BannerOption } from "@/types/banner";
import { getVersionDates } from "@/components/BannerArchive/BannerArchive.utils";

export function filterBanners(
    banners: Banner[],
    values: BannerOption[],
    unique: boolean,
    sortDirection: SortOrder,
    game: Game,
    server: Server
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
    reverse = false
) {
    return banners.sort((a, b) => {
        const ai = getVersionDates(a, server, game).versionStart;
        const bi = getVersionDates(b, server, game).versionStart;
        return (
            sortBy(
                new DateObject(ai).date.getTime(),
                new DateObject(bi).date.getTime(),
                reverse
            ) || sortBy(a.id, b.id, reverse)
        );
    });
}
