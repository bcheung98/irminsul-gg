// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import { NTECharacter, NTEWeapon, NTECartridge } from "@/types/nte";
import { BannerProps } from "@/types/banner";

export default function NTEHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: NTECharacter[];
    weapons: NTEWeapon[];
    equipment: NTECartridge[];
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
