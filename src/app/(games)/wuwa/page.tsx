import { Suspense } from "react";

// Component imports
import WuWaHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { WuWaCharacter, WuWaEcho, WuWaWeapon } from "@/types/wuwa";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<WuWaCharacter>("wuwa/resonators");
    const weaponData = await getDataSet<WuWaWeapon>("wuwa/weapons");
    const equipmentData = await getDataSet<WuWaEcho>("wuwa/echoes");
    const characterBannerData = await getDataSet<Banner>(
        "wuwa/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("wuwa/banner-weapons");

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
            <WuWaHome
                characters={characters}
                weapons={weapons}
                equipment={equipment}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
