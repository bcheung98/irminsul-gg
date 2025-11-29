import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { Banner } from "@/types/banner";

export const metadata: Metadata = {
    title: "Banner Archive",
    description: "A list of all Genshin Impact Banners.",
};

export default async function Page() {
    const characterData = await getDataSet<GenshinCharacter>(
        "genshin/characters"
    );
    const weaponData = await getDataSet<GenshinWeapon>("genshin/weapons");
    const characterBannerData = await getDataSet<Banner>(
        "genshin/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("genshin/banner-weapons");
    const chronicledData = await getDataSet<Banner>(
        "genshin/banner-chronicled"
    );

    const [characters, weapons, characterBanners, weaponBanners, chronicled] =
        await Promise.all([
            characterData,
            weaponData,
            characterBannerData,
            weaponBannerData,
            chronicledData,
        ]);

    return (
        <Suspense fallback={<Loader />}>
            <BannerArchive
                characters={characters}
                weapons={weapons}
                banners={{
                    character: characterBanners,
                    weapon: weaponBanners,
                    chronicled,
                }}
            />
        </Suspense>
    );
}
