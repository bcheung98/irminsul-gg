import { AttributeData, GameData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import getGenshinSkillKeyword from "./genshin/getSkillKeyword";

export function formatSkillIconURL(
    url: string,
    attributes: AttributeData,
    index = 0
) {
    if (attributes.id) {
        url = url.replace("{id}", `${attributes.id}`);
    }
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
    skillVersion?: string;
}

type UseSkillKeywordFn = (
    args: GetSkillKeywordProps
) => SkillKeyword | undefined;

export function useSkillKeyword(): GameData<UseSkillKeywordFn> {
    return {
        genshin: getGenshinSkillKeyword,
        hsr: function (args: GetSkillKeywordProps): SkillKeyword | undefined {
            throw new Error("Function not implemented.");
        },
        wuwa: function (args: GetSkillKeywordProps): SkillKeyword | undefined {
            throw new Error("Function not implemented.");
        },
        zzz: function (args: GetSkillKeywordProps): SkillKeyword | undefined {
            throw new Error("Function not implemented.");
        },
        uma: function (args: GetSkillKeywordProps): SkillKeyword | undefined {
            throw new Error("Function not implemented.");
        },
    };
}
