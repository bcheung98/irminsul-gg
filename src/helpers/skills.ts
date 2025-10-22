import { AttributeData, GameData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import getGenshinSkillKeyword from "./genshin/getSkillKeyword";

export function formatSkillIconURL(
    url: string,
    attributes: AttributeData,
    index = 0
) {
    if (attributes.name) {
        url = url.replace("{name}", attributes.name.toLocaleLowerCase());
    }
    if (attributes.weaponType) {
        url = url.replace("{weaponType}", attributes.weaponType);
    }
    if (index > 0) {
        url += `${index}`;
    }
    return url;
}

export interface GetSkillKeywordProps {
    tag: any;
    skills?: CharacterSkillsList;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

type UseSkillKeywordFn = (
    args: GetSkillKeywordProps
) => SkillKeyword | undefined;

export function useSkillKeyword(): GameData<UseSkillKeywordFn> {
    return {
        genshin: getGenshinSkillKeyword,
    };
}
