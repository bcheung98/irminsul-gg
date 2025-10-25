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
        hsr: function (material: string | number): Material {
            throw new Error("Function not implemented.");
        },
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
    showUnreleasedContent = true
): GameData<(category: GenshinMaterialCategory) => Material[]> {
    return {
        genshin: getGenshinMaterialCategory(showUnreleasedContent),
        hsr: function (category: GenshinMaterialCategory): Material[] {
            throw new Error("Function not implemented.");
        },
        wuwa: function (category: GenshinMaterialCategory): Material[] {
            throw new Error("Function not implemented.");
        },
        zzz: function (category: GenshinMaterialCategory): Material[] {
            throw new Error("Function not implemented.");
        },
        uma: function (category: GenshinMaterialCategory): Material[] {
            throw new Error("Function not implemented.");
        },
    };
}
