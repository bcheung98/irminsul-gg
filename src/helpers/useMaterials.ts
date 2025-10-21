import {
    getGenshinMaterial,
    getGenshinMaterialCategory,
} from "@/helpers/genshin/getMaterials";
import { Material } from "@/types/materials";
import { GenshinMaterialCategory } from "@/types/genshin/materials";

export function useMaterials(showUnreleasedContent = true): {
    [game: string]: (material: string | number) => Material;
} {
    return {
        genshin: getGenshinMaterial(showUnreleasedContent),
    };
}

export function useMaterialsCategory(showUnreleasedContent = true): {
    genshin: (category: GenshinMaterialCategory) => Material[];
} {
    return {
        genshin: getGenshinMaterialCategory(showUnreleasedContent),
    };
}
