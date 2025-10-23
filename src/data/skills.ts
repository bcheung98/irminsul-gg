import { GameData } from "@/types";
import {
    GenshinCharacterPassiveType,
    GenshinSkillKey,
} from "@/types/genshin/character";

export const skillKeys: GameData<Record<string, string>> = {
    genshin: {
        attack: "Normal Attack",
        skill: "Elemental Skill",
        burst: "Elemental Burst",
        altsprint: "Alternate Sprint",
        a1: "1st Ascension Passive",
        a4: "4th Ascension Passive",
        util: "Passive Talent",
        nightsoul: "Night Realm's Gift Passive",
        moon: "Moonsign Benediction",
        witch: "Witch's Eve Rite",
        "": "Passive Talent",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
    hsr: {},
    wuwa: {},
    zzz: {},
    uma: {},
};

export const skillIconURLs: GameData<Record<string, string>> = {
    genshin: {
        attack: "genshin/weapons/icons/{weaponType}",
        skill: "genshin/characters/talents/{name}_skill",
        burst: "genshin/characters/talents/{name}_burst",
        altsprint: "genshin/characters/talents/{name}_altsprint",
        a1: "genshin/characters/talents/{name}_a1passive",
        a4: "genshin/characters/talents/{name}_a4passive",
        util: "genshin/characters/talents/{name}_utilpassive",
        nightsoul: "genshin/characters/talents/{name}_nightsoulpassive",
        moon: "genshin/characters/talents/{name}_moonpassive",
        witch: "genshin/characters/talents/{name}_witchpassive",
        "": "genshin/characters/talents/{name}_passive",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
    hsr: {},
    wuwa: {},
    zzz: {},
    uma: {},
};
