import { Suspense } from "react";

// Component imports
import UmaHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData = await getDataSet<UmaCharacter>("uma/characters");
    const weaponData = await getDataSet<UmaSupport>("uma/supports");
    const characterBannerData = await getDataSet<Banner>(
        "uma/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("uma/banner-supports");

    const [characters, weapons, characterBanners, weaponBanners] =
        await Promise.all([
            characterData,
            weaponData,
            characterBannerData,
            weaponBannerData,
        ]);

    return (
        <Suspense fallback={<Loader />}>
            <UmaHome
                characters={characters}
                weapons={weapons}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
