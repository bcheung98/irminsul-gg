// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import {
    EndfieldCharacter,
    EndfieldGear,
    EndfieldWeapon,
} from "@/types/endfield";
import { BannerProps } from "@/types/banner";

export default function EndfieldHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: EndfieldCharacter[];
    weapons: EndfieldWeapon[];
    equipment: EndfieldGear[];
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
