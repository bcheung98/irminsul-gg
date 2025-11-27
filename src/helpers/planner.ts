import { DataType } from "@/types";
import { PlannerItemData } from "@/types/planner";

export function parseData<T extends DataType, U extends DataType>(
    item: T | U
): PlannerItemData {
    return {
        id: item.id,
        name: item.name,
        displayName: "fullName" in item ? item.fullName : item.displayName,
        rarity: item.rarity,
        element: "element" in item ? item.element : undefined,
        weaponType: item.weaponType,
        materials: item.materials,
        release: item.release,
        url: item.url,
    };
}
