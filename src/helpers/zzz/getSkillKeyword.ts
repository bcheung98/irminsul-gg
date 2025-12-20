import { skillKeywords } from "@/data/hsr/skillKeywords";
import { GetSkillKeywordProps } from "../skills";

export default function getSkillKeyword({
    tag,
    keywords = [],
    attributes,
}: GetSkillKeywordProps) {
    let keyword = skillKeywords.find((kwrd) => kwrd.tag === tag);
    if (!keyword) {
        keyword = keywords.find((kwrd) => kwrd.tag === tag);
    }
    return keyword;
}
