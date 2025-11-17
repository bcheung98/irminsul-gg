import { GenshinMaterialCategory } from "@/types/genshin/materials";
import { useMaterialsCategory } from "../materials";
import { Day } from "../dates";

export function getFarmableMaterials(day: Day, hideUnreleasedContent = false) {
    let index = -1;
    switch (day) {
        case "Monday":
        case "Thursday":
            index = 0;
            break;
        case "Tuesday":
        case "Friday":
            index = 1;
            break;
        case "Wednesday":
        case "Saturday":
            index = 2;
            break;
        case "Sunday":
            break;
    }
    return {
        characterMats: getMaterials("talent", index, hideUnreleasedContent),
        weaponMats: getMaterials("weapon", index, hideUnreleasedContent),
    };
}

function getMaterials(
    category: Extract<GenshinMaterialCategory, "talent" | "weapon">,
    index: number,
    hideUnreleasedContent = false
) {
    const dropDates = ["Mon/Thu", "Tue/Fri", "Wed/Sat"];

    const materials = useMaterialsCategory(hideUnreleasedContent).genshin(
        category
    );

    return index === -1
        ? materials
              .filter((material) => !material.rarity || material.rarity === 1)
              .map((material) => material.tag)
        : materials
              .filter(
                  (material) =>
                      material.source === dropDates[index] &&
                      (!material.rarity || material.rarity === 1)
              )
              .map((material) => material.tag);
}
