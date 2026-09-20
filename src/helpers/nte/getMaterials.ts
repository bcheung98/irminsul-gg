import { nteMaterials } from "@/data/nte/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getNTEMaterialResolvers = createGameMaterialResolvers(
    nteMaterials,
    "nte",
);
