import type { Game } from "@/types";
import type {
    MaterialCategoryResolver,
    MaterialResolver,
} from "@/types/materials";
import {
    getGenshinMaterial,
    getGenshinMaterialCategory,
} from "@/helpers/genshin/getMaterials";
import { getHSRMaterial, getHSRMaterialCategory } from "./hsr/getMaterials";
import { getWuWaMaterial, getWuWaMaterialCategory } from "./wuwa/getMaterials";
import { getZZZMaterial, getZZZMaterialCategory } from "./zzz/getMaterials";
import {
    getEndfieldMaterial,
    getEndfieldMaterialCategory,
} from "./endfield/getMaterials";
import { getNTEMaterial, getNTEMaterialCategory } from "./nte/getMaterials";

export function getMaterialResolver(
    game: Game,
    hideUnreleasedContent = false,
): MaterialResolver {
    switch (game) {
        case "genshin":
            return getGenshinMaterial(hideUnreleasedContent);
        case "hsr":
            return getHSRMaterial(hideUnreleasedContent);
        case "wuwa":
            return getWuWaMaterial(hideUnreleasedContent);
        case "zzz":
            return getZZZMaterial(hideUnreleasedContent);
        case "uma":
            return () => {
                throw new Error("Uma materials not implemented.");
            };
        case "endfield":
            return getEndfieldMaterial(hideUnreleasedContent);
        case "nte":
            return getNTEMaterial(hideUnreleasedContent);
    }
}

export function getMaterialCategoryResolver(
    game: Game,
    hideUnreleasedContent = false,
): MaterialCategoryResolver {
    switch (game) {
        case "genshin":
            return getGenshinMaterialCategory(hideUnreleasedContent);
        case "hsr":
            return getHSRMaterialCategory(hideUnreleasedContent);
        case "wuwa":
            return getWuWaMaterialCategory(hideUnreleasedContent);
        case "uma":
            return () => {
                throw new Error("Uma materials not implemented.");
            };
        case "zzz":
            return getZZZMaterialCategory(hideUnreleasedContent);
        case "endfield":
            return getEndfieldMaterialCategory(hideUnreleasedContent);
        case "nte":
            return getNTEMaterialCategory(hideUnreleasedContent);
    }
}
