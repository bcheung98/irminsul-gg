import { wuwaMaterials } from "@/data/wuwa/materials";
import { createGameMaterialResolvers } from "../createMaterialResolvers";

const getResolvers = createGameMaterialResolvers(wuwaMaterials, "wuwa");

export function getWuWaMaterial(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterial;
}

export function getWuWaMaterialCategory(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterialCategory;
}
