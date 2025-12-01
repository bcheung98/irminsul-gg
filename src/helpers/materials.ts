import {
    getGenshinMaterial,
    getGenshinMaterialCategory,
} from "@/helpers/genshin/getMaterials";
import { getHSRMaterial, getHSRMaterialCategory } from "./hsr/getMaterials";
import { GameData } from "@/types";
import { Material } from "@/types/materials";

export function useMaterials(
    hideUnreleasedContent = false
): GameData<(material: string | number) => Material> {
    return {
        genshin: getGenshinMaterial(hideUnreleasedContent),
        hsr: getHSRMaterial(hideUnreleasedContent),
        wuwa: function (material: string | number): Material {
            throw new Error("Function not implemented.");
        },
        zzz: function (material: string | number): Material {
            throw new Error("Function not implemented.");
        },
        uma: function (material: string | number): Material {
            throw new Error("Function not implemented.");
        },
    };
}

export function useMaterialsCategory(
    hideUnreleasedContent = false
): GameData<(category: string) => Material[]> {
    return {
        genshin: getGenshinMaterialCategory(hideUnreleasedContent),
        hsr: getHSRMaterialCategory(hideUnreleasedContent),
        wuwa: function (category: string): Material[] {
            throw new Error("Function not implemented.");
        },
        zzz: function (category: string): Material[] {
            throw new Error("Function not implemented.");
        },
        uma: function (category: string): Material[] {
            throw new Error("Function not implemented.");
        },
    };
}
