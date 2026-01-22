import {
    getGenshinMaterial,
    getGenshinMaterialCategory,
} from "@/helpers/genshin/getMaterials";
import { getHSRMaterial, getHSRMaterialCategory } from "./hsr/getMaterials";
import { getWuWaMaterial, getWuWaMaterialCategory } from "./wuwa/getMaterials";
import { GameData } from "@/types";
import { Material } from "@/types/materials";
import { getZZZMaterial, getZZZMaterialCategory } from "./zzz/getMaterials";
import {
    getEndfieldMaterial,
    getEndfieldMaterialCategory,
} from "./endfield/getMaterials";

export function useMaterials(
    hideUnreleasedContent = false
): GameData<(material: string | number) => Material> {
    return {
        genshin: getGenshinMaterial(hideUnreleasedContent),
        hsr: getHSRMaterial(hideUnreleasedContent),
        wuwa: getWuWaMaterial(hideUnreleasedContent),
        zzz: getZZZMaterial(hideUnreleasedContent),
        uma: function (): Material {
            throw new Error("Function not implemented.");
        },
        endfield: getEndfieldMaterial(hideUnreleasedContent),
    };
}

export function useMaterialsCategory(
    hideUnreleasedContent = false
): GameData<(category: string) => Material[]> {
    return {
        genshin: getGenshinMaterialCategory(hideUnreleasedContent),
        hsr: getHSRMaterialCategory(hideUnreleasedContent),
        wuwa: getWuWaMaterialCategory(hideUnreleasedContent),
        zzz: getZZZMaterialCategory(hideUnreleasedContent),
        uma: function (): Material[] {
            throw new Error("Function not implemented.");
        },
        endfield: getEndfieldMaterialCategory(hideUnreleasedContent),
    };
}
