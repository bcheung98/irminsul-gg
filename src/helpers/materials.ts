import type { Game } from "@/types";
import type {
    CustomMaterials,
    MaterialResolvers,
    ResolvedCustomMaterial,
} from "@/types/materials";
import { getGenshinMaterialResolvers } from "@/helpers/genshin/getMaterials";
import { getHSRMaterialResolvers } from "./hsr/getMaterials";
import { getWuWaMaterialResolvers } from "./wuwa/getMaterials";
import { getZZZMaterialResolvers } from "./zzz/getMaterials";
import { getEndfieldMaterialResolvers } from "./endfield/getMaterials";
import { getNTEMaterialResolvers } from "./nte/getMaterials";

/**
 * Returns the precomputed material resolvers for the specified game,
 * selecting the appropriate dataset based on the unreleased content setting.
 * @returns
 * - `getMaterial`: Look up a material by ID, name, or tag.
 * - `getMaterialCategory`: Get all materials belonging to a category.
 */
export function getMaterialResolvers(
    game: Game,
    hideUnreleasedContent = false,
): MaterialResolvers {
    switch (game) {
        case "genshin":
            return getGenshinMaterialResolvers(hideUnreleasedContent);
        case "hsr":
            return getHSRMaterialResolvers(hideUnreleasedContent);
        case "wuwa":
            return getWuWaMaterialResolvers(hideUnreleasedContent);
        case "zzz":
            return getZZZMaterialResolvers(hideUnreleasedContent);
        case "uma":
            return umaMaterialResolvers;
        case "endfield":
            return getEndfieldMaterialResolvers(hideUnreleasedContent);
        case "nte":
            return getNTEMaterialResolvers(hideUnreleasedContent);
    }
}

// Uma doesn't have materials.
const umaMaterialResolvers: MaterialResolvers = {
    getMaterial() {
        throw new Error("Uma materials not implemented.");
    },
    getMaterialCategory() {
        throw new Error("Uma materials not implemented.");
    },
};

/** Returns resolved custom material data. */
export function getCustomMaterial(
    material: string | number,
    customMaterials?: CustomMaterials,
): ResolvedCustomMaterial | undefined {
    if (typeof material !== "string" || !material.startsWith("custom-")) {
        return;
    }

    const direct = customMaterials?.[material];

    if (direct) {
        return {
            id: material,
            name: direct.name,
            rarity: direct.rarities[0],
        };
    }

    const match = material.match(/^(custom-.+)-(\d+)$/);
    if (!match) return;

    const [, id, tier] = match;
    const customMaterial = customMaterials?.[id];

    if (!customMaterial) return;

    return {
        id: material,
        name: `${customMaterial.name} ${tier}`,
        rarity: customMaterial.rarities[Number(tier) - 1],
    };
}
