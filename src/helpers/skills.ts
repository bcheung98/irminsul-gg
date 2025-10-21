import { AttributeData } from "@/types/_common";

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
