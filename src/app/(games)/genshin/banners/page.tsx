import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");
    const weapons = await getDataSet<GenshinWeapon>("genshin/weapons");
    const characterBanners = await getDataSet<Banner>(
        "genshin/banner-characters"
    );
    const weaponBanners = await getDataSet<Banner>("genshin/banner-weapons");
    const chronicled = await getDataSet<Banner>("genshin/banner-chronicled");

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
