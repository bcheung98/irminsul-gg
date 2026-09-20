import type { Version } from "./version";
import type { GenshinMaterialCategory } from "./genshin/materials";
import type { HSRMaterialCategory } from "./hsr/materials";
import type { WuWaMaterialCategory } from "./wuwa/materials";
import type { ZZZMaterialCategory } from "./zzz/materials";
import type { EndfieldMaterialCategory } from "./endfield/materials";
import type { NTEMaterialCategory } from "./nte/materials";

export interface Materials {
    [material: string]: string | number;
}

export interface Material {
    id: string | number;
    name: string;
    displayName?: string;
    tag?: string;
    category: string;
    rarity?: number;
    source?: string;
    release: Version;
    imgURL?: string;
}

export type MaterialCategory =
    | GenshinMaterialCategory
    | HSRMaterialCategory
    | WuWaMaterialCategory
    | ZZZMaterialCategory
    | EndfieldMaterialCategory
    | NTEMaterialCategory;

export type MaterialResolver = (material: string | number) => Material;

export type MaterialCategoryResolver = (category: string) => Material[];

export interface MaterialResolvers {
    getMaterial: MaterialResolver;
    getMaterialCategory: MaterialCategoryResolver;
}
