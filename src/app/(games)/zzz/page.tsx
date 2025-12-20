import { Suspense } from "react";

// Component imports
import ZZZHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { ZZZBangboo, ZZZCharacter, ZZZDriveDisc, ZZZWeapon } from "@/types/zzz";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<ZZZCharacter>("zzz/agents");
    const weaponData = await getDataSet<ZZZWeapon>("zzz/w-engines");
    const equipmentData = await getDataSet<ZZZDriveDisc>("zzz/drive-discs");
    const bangbooData = await getDataSet<ZZZBangboo>("zzz/bangboos");
    const characterBannerData = await getDataSet<Banner>(
        "zzz/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("zzz/banner-weapons");

    const [
        characters,
        weapons,
        equipment,
        bangboo,
        characterBanners,
        weaponBanners,
    ] = await Promise.all([
        characterData,
        weaponData,
        equipmentData,
        bangbooData,
        characterBannerData,
        weaponBannerData,
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <ZZZHome
                characters={characters}
                weapons={weapons}
                equipment={equipment}
                bangboo={bangboo}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
