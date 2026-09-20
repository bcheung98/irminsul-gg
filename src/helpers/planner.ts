import { createCharacterTraceStats } from "./hsr/characterTraces";
import type { DataType, GameNoUma } from "@/types";
import type { NTECharacterPassive } from "@/types/nte/character";
import type { LegacyPlannerItemData, PlannerItemData } from "@/types/planner";

/** Takes a item's data and converts it into a compact version for the Ascension Planner. */
export function createPlannerItemData<T extends DataType, U extends DataType>(
    _: GameNoUma,
    item: T | U,
): PlannerItemData {
    return {
        /** Baseline shared attributes */
        id: item.id,
        name: item.name,
        displayName: item.displayName,
        rarity: item.rarity,
        element: "element" in item ? item.element : undefined,
        weaponType: item.weaponType,
        materials: item.materials,
        release: item.release,
        url: item.url,
        values: {},

        /** Endfield operator class. */
        specialty: "baseSkills" in item ? item.specialty : undefined,

        /** HSR trace stats. */
        traceStats:
            "traces" in item
                ? createCharacterTraceStats(item.traces)
                : undefined,

        /** WuWa bonus stats. */
        bonusStats: "bonusStats" in item ? item.bonusStats : undefined,

        /** Endfield main attribute. */
        mainAttribute:
            "baseSkills" in item ? item.stats.attributes[0] : undefined,

        /** Endfield passive talents. */
        talents: "baseSkills" in item ? item.passives : undefined,

        /** Endfield base skills. */
        baseSkills: "baseSkills" in item ? item.baseSkills : undefined,

        /** NTE character life skills, returns an array of how many levels each life skill has. */
        lifeSkills:
            "console" in item
                ? item.passives
                      .map(
                          (passive: NTECharacterPassive) =>
                              passive.type === "life" &&
                              passive.description.split(
                                  '<span class="text-highlight">Level ',
                              ).length - 1,
                      )
                      .filter(Boolean)
                : undefined,
    };
}

/** Updates the item's data in case the names or materials change. */
export function validatePlannerItem(
    inputItem: LegacyPlannerItemData,
    characters: PlannerItemData[],
    weapons: PlannerItemData[],
): PlannerItemData {
    // Remove legacy HSR trace data
    const { traces: _, ...validatedItem } = inputItem;

    // Custom items don't need validation
    if (validatedItem.custom) return validatedItem;

    const item = [...characters, ...weapons].find(
        (item) => item.id === validatedItem.id,
    );
    if (!item) throw new Error("Item not found");

    return {
        ...validatedItem,
        name: item.name,
        displayName: item.displayName,
        materials: item.materials,
        traceStats: item.traceStats,
    };
}
