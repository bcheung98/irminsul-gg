import { genshinMaterials } from "@/data/genshin/materials";
import { createGameMaterialResolvers } from "../createMaterialResolvers";

const getResolvers = createGameMaterialResolvers(genshinMaterials, "genshin");

export function getGenshinMaterial(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterial;
}

export function getGenshinMaterialCategory(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterialCategory;
}
