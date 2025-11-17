import {
    GenshinCharacterInfoCard,
    GenshinWeaponInfoCard,
} from "@/components/InfoCard";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
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
        },
        hsr: {
            characters: "hsr/icons/Character",
            weapons: "hsr/icons/Lightcone",
        },
        wuwa: {
            characters: "wuwa/icons/Character",
            weapons: "wuwa/icons/Weapon",
        },
        zzz: {
            characters: "zzz/icons/Characters",
            weapons: "zzz/icons/W-Engine",
        },
        uma: { characters: "", weapons: "" },
    };
    return items[game][tag];
}

export function textLabelTitle(game: Game, tag: keyof VersionHighlightsProps) {
    const items: GameData<Data<string>> = {
        genshin: { characters: "Characters", weapons: "Weapons" },
        hsr: { characters: "Characters", weapons: "Light Cones" },
        wuwa: { characters: "Resonators", weapons: "Weapons" },
        zzz: { characters: "Agents", weapons: "W-Engines" },
        uma: { characters: "", weapons: "" },
    };
    return `New ${items[game][tag]}`;
}

export function renderInfoCard(
    game: Game,
    tag: keyof VersionHighlightsProps,
    item: VersionItemData
) {
    const items: GameData<Data<React.ReactNode>> = {
        genshin: {
            characters: (
                <GenshinCharacterInfoCard
                    key={item.id}
                    character={item as GenshinCharacter}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            weapons: (
                <GenshinWeaponInfoCard
                    key={item.id}
                    weapon={item as GenshinWeapon}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
        },
        hsr: { characters: <></>, weapons: <></> },
        wuwa: { characters: <></>, weapons: <></> },
        zzz: { characters: <></>, weapons: <></> },
        uma: { characters: <></>, weapons: <></> },
    };
    return items[game][tag];
}
