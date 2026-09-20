import { endfieldMaterials } from "@/data/endfield/materials";
import { createGameMaterialResolvers } from "../createMaterialResolvers";

const getResolvers = createGameMaterialResolvers(endfieldMaterials, "endfield");

export function getEndfieldMaterial(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterial;
}

export function getEndfieldMaterialCategory(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterialCategory;
}
