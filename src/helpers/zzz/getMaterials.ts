import { zzzMaterials } from "@/data/zzz/materials";
import { createGameMaterialResolvers } from "@/helpers/createMaterialResolvers";

export const getZZZMaterialResolvers = createGameMaterialResolvers(
    zzzMaterials,
    "zzz",
);
