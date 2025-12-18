import {
    GenshinWeaponSubStat,
    weaponSubStats as genshinWeaponSubStats,
} from "@/data/genshin/weaponStats";
import { formatWeaponStats, WuWaWeaponSubStat } from "@/data/wuwa/weaponStats";
import {
    ZZZWeaponSubStat,
    weaponSubStats as zzzWeaponSubStats,
} from "@/data/zzz/weaponStats";
import { sonataEffects } from "@/data/wuwa/sonataEffects";
import { isUnreleasedContent } from "./isUnreleasedContent";
import { AttributeDataKey, Game } from "@/types";
import { CharacterColors } from "@/types/character";

interface Props {
    game: Game;
    key: AttributeDataKey;
    value?: string | number | (string | number)[] | CharacterColors;
}

export function getDataIconURL({ game, key, value }: Props) {
    let src = "";
    let tooltip = "";
    if (game === "genshin") {
        if (key === "element" && value) {
            src = `genshin/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `genshin/skills/Attack_${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat" && value) {
            src = `genshin/icons/stat-icons/${value}`;
            tooltip = `${
                genshinWeaponSubStats[value as GenshinWeaponSubStat].title
            }`;
        }
        if (key === "arkhe") {
            src = `genshin/tcg/icons/factions/${value}`;
            tooltip = `${value}`;
        }
    }
    if (game === "hsr") {
        if (key === "element" && value) {
            src = `hsr/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `hsr/paths/${value}`;
            tooltip = `${value}`;
        }
    }
    if (game === "wuwa") {
        if (key === "element" && value) {
            src = `wuwa/icons/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `wuwa/skills/Attack_${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat" && value) {
            src = `wuwa/icons/stat-icons/${value}`;
            tooltip = `${formatWeaponStats(value as WuWaWeaponSubStat)}`;
        }
        if (key === "sonata" && value) {
            src = `wuwa/sonata/${value}`;
            tooltip = `${
                sonataEffects
                    .filter((sonata) =>
                        isUnreleasedContent(sonata.release.version, "wuwa")
                    )
                    .find((sonata) => sonata.id === value)?.displayName
            }`;
        }
    }
    if (game === "zzz") {
        if (key === "element" && value) {
            src = `zzz/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `zzz/icons/specialties/${value}`;
            tooltip = `${value}`;
        }
        if (key === "attackType" && value) {
            src = `zzz/icons/attack-types/${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat" && value) {
            src = `zzz/icons/stat-icons/${value}`;
            tooltip = `${zzzWeaponSubStats[value as ZZZWeaponSubStat].title}`;
        }
    }
    if (game === "uma") {
        if (key === "specialty") {
            src = `uma/icons/specialties/${value}`;
            tooltip = `${value}`;
        }
    }
    return { src, tooltip };
}
