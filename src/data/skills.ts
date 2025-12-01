import { GameData } from "@/types";
import {
    GenshinCharacterPassiveType,
    GenshinSkillKey,
} from "@/types/genshin/character";

export const skillKeys: GameData<Record<string, string>> = {
    genshin: {
        attack: "Normal Attack",
        skill: "Elemental Skill",
        ultimate: "Elemental Burst",
        altsprint: "Alternate Sprint",
        a1: "1st Ascension Passive",
        a4: "4th Ascension Passive",
        util: "Passive Talent",
        nightsoul: "Night Realm's Gift Passive",
        moon: "Moonsign Benediction",
        special: "",
        "": "Passive Talent",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
    hsr: {
        attack: "Basic ATK",
        skill: "Skill",
        ultimate: "Ultimate",
        talent: "Talent",
        technique: "Technique",
        "memo-skill": "Memosprite Skill",
        "memo-talent": "Memosprite Talent",
    },
    wuwa: {},
    zzz: {},
    uma: {},
};

export const skillIconURLs: GameData<Record<string, string>> = {
    genshin: {
        attack: "genshin/skills/Attack_{weaponType}",
        skill: "genshin/skills/{id}_skill",
        ultimate: "genshin/skills/{id}_ultimate",
        altsprint: "genshin/skills/{id}_altsprint",
        a1: "genshin/skills/{id}_passive_a1",
        a4: "genshin/skills/{id}_passive_a4",
        util: "genshin/skills/{id}_passive_util",
        nightsoul: "genshin/skills/{id}_passive_nightsoul",
        moon: "genshin/skills/{id}_passive_moon",
        special: "genshin/skills/{id}_passive_special",
        "": "genshin/skills/{id}_passive",
    } as Record<GenshinSkillKey | GenshinCharacterPassiveType, string>,
    hsr: {
        attack: "hsr/skills/{id}_attack",
        skill: "hsr/skills/{id}_skill",
        ultimate: "hsr/skills/{id}_ultimate",
        talent: "hsr/skills/{id}_talent",
        technique: "hsr/skills/{id}_technique",
        "memo-skill": "hsr/skills/{id}_memo_skill",
        "memo-talent": "hsr/skills/{id}_memo_talent",
    },
    wuwa: {},
    zzz: {},
    uma: {},
};
