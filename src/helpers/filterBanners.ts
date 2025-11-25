import { sortBy } from "@/utils";
import DateObject from "./dates";
import { SortOrder } from "@/types";
import { Banner, BannerOption } from "@/types/banner";

export function filterBanners(
    banners: Banner[],
    values: BannerOption[],
    unique: boolean,
    sortDirection: SortOrder
) {
    let items = [...banners];
    if (values.length > 0) {
        items = items.filter((banner) => {
            function filterFn(item: BannerOption) {
                return banner.rateUps.map((item) => item).includes(item.name);
            }
            return unique ? values.every(filterFn) : values.some(filterFn);
        });
    }
    return sortBanners(banners, sortDirection === "desc");
}

export function sortBanners(banners: Banner[], reverse = false) {
    return banners.sort((a, b) =>
        sortBy(
            new DateObject(a.start).date.getTime(),
            new DateObject(b.start).date.getTime(),
            reverse
        )
    );
}
