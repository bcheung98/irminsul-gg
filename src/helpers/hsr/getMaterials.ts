import { hsrMaterials } from "@/data/hsr/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getHSRMaterialResolvers = createGameMaterialResolvers(
    hsrMaterials,
    "hsr",
);
