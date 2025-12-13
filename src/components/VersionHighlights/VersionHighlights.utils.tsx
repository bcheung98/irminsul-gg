import { categories } from "@/data/categories";
import {
    GenshinArtifactInfoCard,
    GenshinCharacterInfoCard,
    GenshinWeaponInfoCard,
    HSRCharacterInfoCard,
    HSRRelicInfoCard,
    HSRWeaponInfoCard,
    WuWaCharacterInfoCard,
    WuWaEchoInfoCard,
    WuWaWeaponInfoCard,
    ZZZBangbooInfoCard,
    ZZZCharacterInfoCard,
    ZZZDriveDiscInfoCard,
    ZZZWeaponInfoCard,
} from "@/components/InfoCard";
import { Game, GameData } from "@/types";
import {
    VersionHighlightsProps,
    VersionItemData,
} from "./VersionHighlights.types";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { HSRCharacter, HSRRelic, HSRWeapon } from "@/types/hsr";
import { WuWaCharacter, WuWaWeapon, WuWaEcho } from "@/types/wuwa";
import { ZZZBangboo, ZZZCharacter, ZZZDriveDisc, ZZZWeapon } from "@/types/zzz";

type Data<T> = Partial<Record<keyof VersionHighlightsProps, T>>;

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
            bangboos: "zzz/icons/Bangboo",
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
            characters: (
                <HSRCharacterInfoCard
                    key={item.id}
                    character={item as HSRCharacter}
                    props={{
                        componentID: `${item.id}-versionHighlights`,
                        background: backround,
                    }}
                />
            ),
            weapons: (
                <HSRWeaponInfoCard
                    key={item.id}
                    weapon={item as HSRWeapon}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            equipment: (
                <HSRRelicInfoCard
                    key={item.id}
                    relic={item as HSRRelic}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
        },
        wuwa: {
            characters: (
                <WuWaCharacterInfoCard
                    key={item.id}
                    character={item as WuWaCharacter}
                    props={{
                        componentID: `${item.id}-versionHighlights`,
                        background: backround,
                    }}
                />
            ),
            weapons: (
                <WuWaWeaponInfoCard
                    key={item.id}
                    weapon={item as WuWaWeapon}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            equipment: (
                <WuWaEchoInfoCard
                    key={item.id}
                    echo={item as WuWaEcho}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
        },
        zzz: {
            characters: (
                <ZZZCharacterInfoCard
                    key={item.id}
                    character={item as ZZZCharacter}
                    props={{
                        componentID: `${item.id}-versionHighlights`,
                        background: backround,
                    }}
                />
            ),
            weapons: (
                <ZZZWeaponInfoCard
                    key={item.id}
                    weapon={item as ZZZWeapon}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            equipment: (
                <ZZZDriveDiscInfoCard
                    key={item.id}
                    disc={item as ZZZDriveDisc}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
            bangboos: (
                <ZZZBangbooInfoCard
                    key={item.id}
                    bangboo={item as ZZZBangboo}
                    props={{ componentID: `${item.id}-versionHighlights` }}
                />
            ),
        },
        uma: {
            characters: <></>,
            weapons: <></>,
            equipment: undefined,
        },
    };
    return items[game][tag];
}
