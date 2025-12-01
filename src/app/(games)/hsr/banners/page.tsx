import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { HSRCharacter, HSRWeapon } from "@/types/hsr";
import { Banner } from "@/types/banner";

export const metadata: Metadata = {
    title: "Banner Archive",
    description: "A list of all Honkai: Star Rail Banners.",
};

export default async function Page() {
    const characterData = await getDataSet<HSRCharacter>("hsr/characters");
    const weaponData = await getDataSet<HSRWeapon>("hsr/lightcones");
    const characterBannerData = await getDataSet<Banner>(
        "hsr/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("hsr/banner-weapons");

    const [characters, weapons, characterBanners, weaponBanners] =
        await Promise.all([
            characterData,
            weaponData,
            characterBannerData,
            weaponBannerData,
        ]);

    return (
        <Suspense fallback={<Loader />}>
            <BannerArchive
                characters={characters}
                weapons={weapons}
                banners={{
                    character: characterBanners,
                    weapon: weaponBanners,
                }}
            />
        </Suspense>
    );
}
