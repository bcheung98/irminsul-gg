import { Suspense } from "react";

// Component imports
import BannerArchive from "@/components/BannerArchive";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { bannerArchiveMetaData, getMetadata } from "@/helpers/metadata";

// Type imports
import { ZZZCharacter, ZZZWeapon } from "@/types/zzz";
import { Banner } from "@/types/banner";

export const metadata = getMetadata({
    overrides: bannerArchiveMetaData("zzz"),
});

export default async function Page() {
    const characterData = await getDataSet<ZZZCharacter>("zzz/agents");
    const weaponData = await getDataSet<ZZZWeapon>("zzz/w-engines");
    const characterBannerData = await getDataSet<Banner>(
        "zzz/banner-characters"
    );
    const weaponBannerData = await getDataSet<Banner>("zzz/banner-weapons");

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
