import { endfieldMaterials } from "@/data/endfield/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getEndfieldMaterialResolvers = createGameMaterialResolvers(
    endfieldMaterials,
    "endfield",
);
