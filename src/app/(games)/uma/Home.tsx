// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import { GamePageRoot } from "@/components/PageRoot";

// Type imports
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { BannerProps } from "@/types/banner";

export default function UmaHome({
    characters,
    weapons,
    banners,
}: {
    characters: UmaCharacter[];
    weapons: UmaSupport[];
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
        />
    );
}
