import { Skill, SkillKeyword } from "@/types/skill";
import { GenshinCharacterPassive } from "@/types/genshin/character";
import { skillIconURLs } from "@/data/skills";
import { formatSkillIconURL, GetSkillKeywordProps } from "../skills";

export default function getSkillKeyword({
    tag,
    skills = {},
    keywords = [],
    attributes,
}: GetSkillKeywordProps) {
    const passives = skills.passives as GenshinCharacterPassive[];
    let keyword: SkillKeyword | undefined;
    if (tag.startsWith("_")) {
        const [_, skillKey] = tag.split("_");
        let skill: Skill | undefined;
        if (["a1", "a4", "util", "nightsoul", "special"].includes(skillKey)) {
            skill = passives.find((passive) => passive.type === skillKey);
        } else {
            skill = skills[skillKey]![0];
        }
        if (skill) {
            keyword = {
                tag: tag,
                type: skillKey,
                name: skill.name,
                icon: formatSkillIconURL(
                    skillIconURLs.genshin[skillKey],
                    attributes
                ),
                description: skill.description,
            };
        }
    } else {
        keyword = keywords.find((key) => key.tag === tag);
    }
    return keyword;
}
