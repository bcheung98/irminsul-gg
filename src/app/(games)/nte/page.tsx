import { Suspense } from "react";

// Component imports
import NTEHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";

// Type imports
import { NTECartridge, NTECharacter, NTEWeapon } from "@/types/nte";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<NTECharacter>("nte/espers");
    const weaponData = await getDataSet<NTEWeapon>("nte/arcs");
    const equipmentData = await getDataSet<NTECartridge>("nte/cartridges");
    const characterBannerData = await getDataSet<Banner>(
        "nte/banner-characters",
    );
    const weaponBannerData = await getDataSet<Banner>("nte/banner-weapons");

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
            <NTEHome
                characters={characters}
                weapons={weapons}
                equipment={equipment}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
