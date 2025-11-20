import { categories } from "@/data/categories";
import {
    GenshinArtifactInfoCard,
    GenshinCharacterInfoCard,
    GenshinWeaponInfoCard,
} from "@/components/InfoCard";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { Game, GameData } from "@/types";
import {
    VersionHighlightsProps,
    VersionItemData,
} from "./VersionHighlights.types";

type Data<T> = Record<keyof VersionHighlightsProps, T>;

export function textLabelIcon(game: Game, tag: keyof VersionHighlightsProps) {
    const items: GameData<Data<string>> = {
        genshin: {
            characters: "genshin/icons/Aether",
            weapons: "genshin/icons/Weapons",
            equipment: "genshin/icons/Artifact",
        },
        hsr: {
            characters: "hsr/icons/Character",
            weapons: "hsr/icons/Lightcone",
            equipment: "hsr/icons/Relic",
        },
        wuwa: {
            characters: "wuwa/icons/Character",
            weapons: "wuwa/icons/Weapon",
            equipment: "wuwa/icons/Echo",
        },
        zzz: {
            characters: "zzz/icons/Characters",
            weapons: "zzz/icons/W-Engine",
            equipment: "zzz/icons/Drive_Disc",
        },
        uma: {
            characters: "",
            weapons: "",
            equipment: "",
        },
    };
    return items[game][tag];
}

export function textLabelTitle(game: Game, tag: keyof VersionHighlightsProps) {
    return `New ${categories[`${game}/${tag}`]}`;
}

export function renderInfoCard(
    game: Game,
    tag: keyof VersionHighlightsProps,
    item: VersionItemData,
    backround = ""
) {
    const items: GameData<Data<React.ReactNode>> = {
        genshin: {
            characters: (
                <GenshinCharacterInfoCard
                    key={item.id}
                    character={item as GenshinCharacter}
                    props={{
                        componentID: `${item.id}-versionHighlights`,
                        background: backround,
                    }}
                />
            ),
            weapons: (
                <GenshinWeaponInfoCard
                    key={item.id}
                    weapon={item as GenshinWeapon}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            equipment: (
                <GenshinArtifactInfoCard
                    key={item.id}
                    artifact={item as GenshinArtifact}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
        },
        hsr: {
            characters: <></>,
            weapons: <></>,
            equipment: undefined,
        },
        wuwa: {
            characters: <></>,
            weapons: <></>,
            equipment: undefined,
        },
        zzz: {
            characters: <></>,
            weapons: <></>,
            equipment: undefined,
        },
        uma: {
            characters: <></>,
            weapons: <></>,
            equipment: undefined,
        },
    };
    return items[game][tag];
}
