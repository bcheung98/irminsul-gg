import { genshinMaterials } from "@/data/genshin/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getGenshinMaterialResolvers = createGameMaterialResolvers(
    genshinMaterials,
    "genshin",
);
