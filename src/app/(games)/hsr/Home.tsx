// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import { HSRCharacter, HSRWeapon, HSRRelic } from "@/types/hsr";
import { BannerProps } from "@/types/banner";

export default function HSRHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: HSRCharacter[];
    weapons: HSRWeapon[];
    equipment: HSRRelic[];
    banners: BannerProps;
}) {
    return (
        <GamePageRoot
            header={
                <CurrentBanners
                    characters={characters}
                    weapons={weapons}
                    banners={banners}
                />
            }
        >
            <VersionHighlights
                characters={characters}
                weapons={weapons}
                equipment={equipment}
            />
        </GamePageRoot>
    );
}
