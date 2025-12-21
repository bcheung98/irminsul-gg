import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { bannerArchiveMetaData, getMetadata } from "@/helpers/metadata";

// Type imports
import { WuWaCharacter, WuWaWeapon } from "@/types/wuwa";
import { Banner } from "@/types/banner";

export const metadata = getMetadata({
    overrides: bannerArchiveMetaData("wuwa"),
});

export default async function Page() {
    const characterData = await getDataSet<WuWaCharacter>("wuwa/resonators");
    const weaponData = await getDataSet<WuWaWeapon>("wuwa/weapons");
    const characterBannerData = await getDataSet<Banner>(
        "wuwa/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("wuwa/banner-weapons");

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
