// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import { ZZZCharacter, ZZZWeapon, ZZZDriveDisc, ZZZBangboo } from "@/types/zzz";
import { BannerProps } from "@/types/banner";

export default function ZZZHome({
    characters,
    weapons,
    equipment,
    bangboo,
    banners,
}: {
    characters: ZZZCharacter[];
    weapons: ZZZWeapon[];
    equipment: ZZZDriveDisc[];
    bangboo: ZZZBangboo[];
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
                bangboos={bangboo}
            />
        </GamePageRoot>
    );
}
