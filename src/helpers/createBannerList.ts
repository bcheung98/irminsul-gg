"use server";

// Type imports
import { BannerProps, BannerType } from "@/types/banner";

export async function getBannerData(banners: BannerProps) {
    const res: BannerProps = {
        character: [],
        weapon: [],
    };
    Object.entries(banners).forEach(
        ([key, value]) => (res[key as BannerType] = value)
    );
    return res;
}
