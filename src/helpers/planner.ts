import { DataType, GameData, GameNoUma } from "@/types";
import { Materials } from "@/types/materials";
import { CostSliderValues, PlannerItemData } from "@/types/planner";
import { useMaterials } from "./materials";

export function parseData<T extends DataType, U extends DataType>(
    game: GameNoUma,
    item: T | U
): PlannerItemData {
    return {
        id: Number(item.id),
        name: item.name,
        displayName: "fullName" in item ? item.fullName : item.displayName,
        rarity: item.rarity,
        element: "element" in item ? item.element : undefined,
        weaponType: item.weaponType,
        materials: item.materials,
        release: item.release,
        url: item.url,
        values: skillData[game],
    };
}

export function parseMaterials(game: GameNoUma, materials: Materials) {
    const getMaterials = useMaterials()[game];
    return Object.fromEntries(
        Object.entries(materials).map(([key, material]) => [
            key,
            getMaterials(material).id,
        ])
    );
}

const skillData: GameData<Record<string, CostSliderValues>> = {
    genshin: {},
    hsr: {},
    wuwa: {},
    zzz: {},
    uma: {},
};
