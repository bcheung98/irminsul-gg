import { Suspense } from "react";

// Component imports
import HSRHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { HSRCharacter, HSRRelic, HSRWeapon } from "@/types/hsr";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<HSRCharacter>("hsr/characters");
    const weaponData = await getDataSet<HSRWeapon>("hsr/lightcones");
    const equipmentData = await getDataSet<HSRRelic>("hsr/relics");
    const characterBannerData = await getDataSet<Banner>(
        "hsr/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("hsr/banner-weapons");

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
            <HSRHome
                characters={characters}
                weapons={weapons}
                equipment={equipment}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
