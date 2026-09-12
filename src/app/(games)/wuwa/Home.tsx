// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import { WuWaCharacter, WuWaWeapon, WuWaEcho } from "@/types/wuwa";
import { BannerProps } from "@/types/banner";

export default function WuWaHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: WuWaCharacter[];
    weapons: WuWaWeapon[];
    equipment: WuWaEcho[];
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
