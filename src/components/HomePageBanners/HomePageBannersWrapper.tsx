"use server";

import { Suspense } from "react";

// Component imports
import HomePageBanners from "./HomePageBanners";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";

// Type imports
import { Banner } from "@/types/banner";

export default async function HomePageBannersWrapper() {
    const [
        genshinCharacters,
        hsrCharacters,
        wuwaCharacters,
        zzzCharacters,
        umaCharacters,
        umaWeapons,
        endfieldCharacters,
        nteCharacters,
    ] = await Promise.all([
        getDataSet<Banner>("genshin/banner-characters"),
        getDataSet<Banner>("hsr/banner-characters"),
        getDataSet<Banner>("wuwa/banner-characters"),
        getDataSet<Banner>("zzz/banner-characters"),
        getDataSet<Banner>("uma/banner-characters"),
        getDataSet<Banner>("uma/banner-supports"),
        getDataSet<Banner>("endfield/banner-characters"),
        getDataSet<Banner>("nte/banner-characters"),
    ]);

    const banners = {
        "genshin/characters": genshinCharacters,
        "hsr/characters": hsrCharacters,
        "wuwa/characters": wuwaCharacters,
        "zzz/characters": zzzCharacters,
        "uma/characters": umaCharacters,
        "uma/weapons": umaWeapons,
        "endfield/characters": endfieldCharacters,
        "nte/characters": nteCharacters,
    };

    return (
        <Suspense fallback={<Loader />}>
            <HomePageBanners banners={banners} />
        </Suspense>
    );
}
