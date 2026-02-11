import { DataType, GameNoUma } from "@/types";
import { PlannerItemData } from "@/types/planner";

export function parseData<T extends DataType, U extends DataType>(
    _: GameNoUma,
    item: T | U,
): PlannerItemData {
    return {
        id: Number(item.id),
        name: item.name,
        displayName: "fullName" in item ? item.displayName : item.displayName,
        rarity: item.rarity,
        element: "element" in item ? item.element : undefined,
        weaponType: item.weaponType,
        specialty: "baseSkills" in item ? item.specialty : undefined, // Endfield operator class
        materials: item.materials,
        traces: "traces" in item ? item.traces : undefined, // HSR traces
        bonusStats: "bonusStats" in item ? item.bonusStats : undefined, // WuWa bonus stats
        release: item.release,
        mainAttribute:
            "baseSkills" in item ? item.stats.attributes[0] : undefined, // Endfield main attribute
        talents: "baseSkills" in item ? item.passives : undefined, // Endfield passive talents
        baseSkills: "baseSkills" in item ? item.baseSkills : undefined, // Endfield base skills
        url: item.url,
        values: {},
    };
}
