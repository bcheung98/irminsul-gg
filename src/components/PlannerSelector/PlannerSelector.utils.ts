export function formatMaterialKey(key: string) {
    return `${key}Mat`
        .replace("talentMat", "talentBook")
        .replace("weekly", "weeklyBoss")
        .replace("weapon", "weaponAscension");
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
