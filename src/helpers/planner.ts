import { DataType, GameNoUma } from "@/types";
import { PlannerItemData } from "@/types/planner";

export function parseData<T extends DataType, U extends DataType>(
    _: GameNoUma,
    item: T | U
): PlannerItemData {
    return {
        id: Number(item.id),
        name: item.name,
        displayName: "fullName" in item ? item.displayName : item.displayName,
        rarity: item.rarity,
        element: "element" in item ? item.element : undefined,
        weaponType: item.weaponType,
        materials: item.materials,
        traces: "traces" in item ? item.traces : undefined,
        bonusStats: "bonusStats" in item ? item.bonusStats : undefined,
        release: item.release,
        url: item.url,
        values: {},
    };
}
