import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { bannerArchiveMetaData, getMetadata } from "@/helpers/metadata";

// Type imports
import { NTECharacter, NTEWeapon } from "@/types/nte";
import { Banner } from "@/types/banner";

export const metadata = getMetadata({
    overrides: bannerArchiveMetaData("nte"),
});

export default async function Page() {
    const characterData = await getDataSet<NTECharacter>("nte/espers");
    const weaponData = await getDataSet<NTEWeapon>("nte/arcs");
    const characterBannerData = await getDataSet<Banner>(
        "nte/banner-characters",
    );
    const weaponBannerData = await getDataSet<Banner>("nte/banner-weapons");

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
