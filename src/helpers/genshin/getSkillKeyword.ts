import { Skill, SkillKeyword } from "@/types/skill";
import { GenshinCharacterPassive } from "@/types/genshin/character";
import { skillIconURLs } from "@/data/skills";
import { formatSkillIconURL, GetSkillKeywordProps } from "../skills";

export default function getSkillKeyword({
    tag,
    skills = {},
    keywords = [],
    attributes,
    skillVersion = "v1",
}: GetSkillKeywordProps) {
    const passives = skills.passives as GenshinCharacterPassive[];
    const upgrades = skills.upgrades as Skill[];
    let keyword: SkillKeyword | undefined;
    if (tag.startsWith("_")) {
        const [_, skillKey] = tag.split("_");
        let skill: Skill | undefined;
        let iconURL = "";
        if (["a1", "a4", "util", "nightsoul", "special"].includes(skillKey)) {
            iconURL = skillIconURLs.genshin[skillKey];
            if (skillVersion !== "v1") {
                skill =
                    passives.find(
                        (passive) =>
                            passive.version?.value === skillVersion &&
                            passive.type === skillKey
                    ) || passives.find((passive) => passive.type === skillKey);
            } else {
                skill = passives.find((passive) => passive.type === skillKey);
            }
        } else if (["c1", "c2", "c3", "c4", "c5", "c6"].includes(skillKey)) {
            const index = Number(skillKey.slice(1));
            iconURL = `genshin/skills/{id}_u${index}`;
            if (skillVersion !== "v1") {
                skill =
                    upgrades.find(
                        (upgrade) =>
                            upgrade.version?.value === skillVersion &&
                            upgrade.index === index
                    ) || upgrades.find((upgrade) => upgrade.index === index);
            } else {
                skill = upgrades.find((upgrade) => upgrade.index === index)!;
            }
        } else {
            iconURL = skillIconURLs.genshin[skillKey];
            if (skillVersion !== "v1") {
                skill = skills[skillKey]!.filter(
                    (skill) => skill.version?.value === skillVersion
                )[0];
            } else {
                skill = skills[skillKey]![0];
            }
        }
        if (skill) {
            keyword = {
                tag,
                type: skillKey,
                name: skill.name,
                icon: formatSkillIconURL(iconURL, attributes),
                description: skill.description,
            };
        }
    } else {
        keyword = keywords.find((key) => key.tag === tag);
    }
    return keyword;
}
