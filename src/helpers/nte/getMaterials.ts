import { nteMaterials } from "@/data/nte/materials";
import { createGameMaterialResolvers } from "../createMaterialResolvers";

const getResolvers = createGameMaterialResolvers(nteMaterials, "nte");

export function getNTEMaterial(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterial;
}

export function getNTEMaterialCategory(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterialCategory;
}
