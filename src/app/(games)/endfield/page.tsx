import { Suspense } from "react";

// Component imports
import EndfieldHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";

// Type imports
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";
import { Banner } from "@/types/banner";

export default async function Page() {
    const characterData =
        await getDataSet<EndfieldCharacter>("endfield/operators");
    const weaponData = await getDataSet<EndfieldWeapon>("endfield/weapons");
    const characterBannerData = await getDataSet<Banner>(
        "endfield/banner-characters",
    );
    const weaponBannerData = await getDataSet<Banner>(
        "endfield/banner-weapons",
    );

    const [characters, weapons, characterBanners, weaponBanners] =
        await Promise.all([
            characterData,
            weaponData,
            characterBannerData,
            weaponBannerData,
        ]);

    return (
        <Suspense fallback={<Loader />}>
            <EndfieldHome
                characters={characters}
                weapons={weapons}
                banners={{ character: characterBanners, weapon: weaponBanners }}
            />
        </Suspense>
    );
}
