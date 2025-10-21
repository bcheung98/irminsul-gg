import {
    getGenshinMaterial,
    getGenshinMaterialCategory,
} from "@/helpers/genshin/getMaterials";
import { GameData } from "@/types";
import { Material } from "@/types/materials";
import { GenshinMaterialCategory } from "@/types/genshin/materials";

export function useMaterials(
    showUnreleasedContent = true
): GameData<(material: string | number) => Material> {
    return {
        genshin: getGenshinMaterial(showUnreleasedContent),
    };
}

export function useMaterialsCategory(
    showUnreleasedContent = true
): GameData<(category: GenshinMaterialCategory) => Material[]> {
    return {
        genshin: getGenshinMaterialCategory(showUnreleasedContent),
    };
}
