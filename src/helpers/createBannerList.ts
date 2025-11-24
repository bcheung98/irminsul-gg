"server only";

// Helper imports
import { sortBy } from "@/utils";
import DateObject from "@/helpers/dates";

// Type imports
import { Banner, BannerProps, BannerType } from "@/types/banner";
import { SortOrder } from "@/types";

export async function getBannerList(
    banners: BannerProps,
    bannerType: BannerType[],
    sortDirection: SortOrder
): Promise<Banner[]> {
    return Object.entries(banners)
        .map(([key, value]) => bannerType.includes(key as BannerType) && value)
        .flat()
        .filter(Boolean)
        .sort((a, b) => {
            const d1 = new DateObject(a.start).date.getTime();
            const d2 = new DateObject(b.start).date.getTime();
            return sortBy(d1, d2, sortDirection === "desc");
        });
}
