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
        "": "Passive Talent",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
};

export const skillIconURLs: GameData<Record<string, string>> = {
    genshin: {
        attack: "genshin/weapons/icons/{weaponType}",
        skill: "genshin/characters/talents/{name}_skill",
        burst: "genshin/characters/talents/{name}_burst",
        altsprint: "genshin/characters/talents/{name}_altsprint",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
};
