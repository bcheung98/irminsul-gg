import { skillKeys } from "@/data/skills";
import { AttributeData } from "@/types";
import { SkillKeyword } from "@/types/skill";
import {
    TCGCharacterCard,
    TCGCharacterCardSkills,
    TCGSkill,
    TCGSkillKey,
    TCGWeaponType,
} from "@/types/genshin/tcg";

export default function getTCGSkillKeyword({
    tag,
    characters = [],
    keywords = [],
}: {
    tag: any;
    characters?: TCGCharacterCard[];
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}) {
    let keyword: SkillKeyword | undefined;
    if (tag.startsWith("_")) {
        const [_, charID, skillKey, index] = tag.split("_");
        let character: TCGCharacterCard | undefined;
        if (characters) {
            character = characters.find(
                (char: TCGCharacterCard) => char.id === Number(charID)
            );
        }
        if (character) {
            const skillList: TCGSkill[] | undefined =
                character.skills[skillKey];
            if (skillList) {
                const skill = skillList[index - 1 || 0];
                keyword = {
                    tag,
                    type: skillKeys["genshin"][skillKey],
                    name: skill.name,
                    cost: skill.cost,
                    description: skill.description,
                    icon: getSkillIcon(
                        skillKey,
                        charID,
                        character.tags[1] as TCGWeaponType,
                        character.skills,
                        index
                    ),
                };
            }
        }
    } else {
        keyword = keywords.find((kwrd) => kwrd.tag === tag);
    }
    return keyword;
}

function getSkillIcon(
    key: TCGSkillKey,
    id: number,
    weapon: TCGWeaponType,
    skills: TCGCharacterCardSkills,
    index?: number
) {
    let src: string;
    if (key === "attack") {
        if (weapon === "Other Weapons") {
            if (skills.attack[0].description.includes("Physical DMG")) {
                src = `genshin/tcg/skills/Attack_Other_Weapons`;
            } else {
                src = `genshin/tcg/skills/Attack_Catalyst`;
            }
        } else {
            src = `genshin/tcg/skills/Attack_${weapon}`;
        }
    } else {
        src = `genshin/tcg/skills/${id}_${key}`;
        if (index) src += `${index}`;
    }
    return src;
}
