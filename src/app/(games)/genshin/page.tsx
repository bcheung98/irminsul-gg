import { Suspense } from "react";

// Component imports
import GenshinHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import {
    GenshinCharacter,
    GenshinWeapon,
    GenshinArtifact,
} from "@/types/genshin";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<GenshinCharacter>(
        "genshin/characters"
    );
    const weaponData = await getDataSet<GenshinWeapon>("genshin/weapons");
    const equipmentData = await getDataSet<GenshinArtifact>(
        "genshin/artifacts"
    );
    const characterBannerData = await getDataSet<Banner>(
        "genshin/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("genshin/banner-weapons");

    const [characters, weapons, equipment, characterBanners, weaponBanners] =
        await Promise.all([
            characterData,
            weaponData,
            equipmentData,
            characterBannerData,
            weaponBannerData,
        ]);

    return (
        <Suspense fallback={<Loader />}>
            <GenshinHome
                characters={characters}
                weapons={weapons}
                equipment={equipment}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
