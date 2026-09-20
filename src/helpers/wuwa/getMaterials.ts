import { wuwaMaterials } from "@/data/wuwa/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getWuWaMaterialResolvers = createGameMaterialResolvers(
    wuwaMaterials,
    "wuwa",
);
