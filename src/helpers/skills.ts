import { AttributeData, Game, GameData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import getGenshinSkillKeyword from "./genshin/getSkillKeyword";
import getHSRSkillKeyword from "./hsr/getSkillKeyword";
import getWuWaSkillKeyword from "./wuwa/getSkillKeyword";
import getZZZSkillKeyword from "./zzz/getSkillKeyword";
import getEndfieldSkillKeyword from "./endfield/getSkillKeyword";

export function formatSkillIconURL(
    url: string,
    attributes: AttributeData,
    index = 0,
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
    args: GetSkillKeywordProps,
) => SkillKeyword | undefined;

export function useSkillKeyword(): GameData<UseSkillKeywordFn> {
    return {
        genshin: getGenshinSkillKeyword,
        hsr: getHSRSkillKeyword,
        wuwa: getWuWaSkillKeyword,
        zzz: getZZZSkillKeyword,
        uma: function (): SkillKeyword | undefined {
            throw new Error("Function not implemented.");
        },
        endfield: getEndfieldSkillKeyword,
    };
}

export function getKeywordPopupTitle(
    game: Game,
    keyword?: SkillKeyword | null,
) {
    switch (game) {
        case "genshin":
            return keyword?.type ? "Related Talents" : "Related effects";
        case "hsr":
        case "wuwa":
        case "endfield":
            return "Glossary";
        case "zzz":
        case "uma":
        default:
            return "Keywords";
    }
}
