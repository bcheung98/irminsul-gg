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
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");
    const weapons = await getDataSet<GenshinWeapon>("genshin/weapons");
    const equipment = await getDataSet<GenshinArtifact>("genshin/artifacts");
    const characterBanners = await getDataSet<Banner>(
        "genshin/banner-characters"
    );
    const weaponBanners = await getDataSet<Banner>("genshin/banner-weapons");

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
