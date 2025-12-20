import { skillKeywords } from "@/data/wuwa/skillKeywords";
import { GetSkillKeywordProps } from "../skills";

export default function getSkillKeyword({
    tag,
    keywords = [],
}: GetSkillKeywordProps) {
    let keyword = skillKeywords.find((kwrd) => kwrd.tag === tag);
    if (!keyword) {
        keyword = keywords.find((kwrd) => kwrd.tag === tag);
    }
    return keyword;
}
