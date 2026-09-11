// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import FarmingSchedule from "@/components/_genshin/FarmingSchedule";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { BannerProps } from "@/types/banner";
import { GenshinTCGCard } from "@/types/genshin/tcg";

export default function GenshinHome({
    characters,
    weapons,
    equipment,
    cards,
    banners,
}: {
    characters: GenshinCharacter[];
    weapons: GenshinWeapon[];
    equipment: GenshinArtifact[];
    cards: GenshinTCGCard[];
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
            leftColumn={
                <VersionHighlights
                    characters={characters}
                    weapons={weapons}
                    equipment={equipment}
                    cards={cards}
                />
            }
            rightColumn={
                <FarmingSchedule characters={characters} weapons={weapons} />
            }
        />
    );
}
