import type { GameNoUma } from "@/types";

export function formatMaterialKey(game: GameNoUma, key: string) {
    let res = `${key}Mat`;
    if (game !== "nte") {
        res = res.replace("weapon", "weaponAscension");
    }
    res = res
        .replace("talentMat", "talentBook")
        .replace("weekly", "weeklyBoss");

    return res;
}

function formatMaterialTitle(title: string) {
    if (title.endsWith("3") || title.endsWith("4")) {
        return title.slice(0, -1);
    }
    return title;
}

export function getOption({
    icon,
    value,
}: {
    icon?: any;
    value: string | number;
}) {
    return {
        icon,
        title: icon?.props.iconProps.tooltip || "",
        value: formatMaterialTitle(value.toString()),
    };
}
