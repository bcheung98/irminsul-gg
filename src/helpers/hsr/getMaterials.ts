import { hsrMaterials } from "@/data/hsr/materials";
import { createGameMaterialResolvers } from "../createMaterialResolvers";

const getResolvers = createGameMaterialResolvers(hsrMaterials, "hsr");

export function getHSRMaterial(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterial;
}

export function getHSRMaterialCategory(hideUnreleasedContent = false) {
    return getResolvers(hideUnreleasedContent).getMaterialCategory;
}
