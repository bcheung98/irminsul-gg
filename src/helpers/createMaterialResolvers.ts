import { isUnreleasedContent } from "./isUnreleasedContent";
import type {
    Material,
    MaterialIndex,
    MaterialResolvers,
} from "@/types/materials";
import type { GameNoUma } from "@/types";

const defaultMaterial: Material = {
    id: 0,
    name: "?",
    category: "",
    rarity: 3,
    release: {
        version: "1.0",
    },
};

// Index materials for fast lookup by ID, name/tag, or category.
function createMaterialIndex(materials: Material[]): MaterialIndex {
    const byId = new Map<string, Material>();
    const byName = new Map<string, Material>();
    const byCategory = new Map<string, Material[]>();

    for (const material of materials) {
        byId.set(`${material.id}`, material);
        byName.set(material.name, material);

        if (material.tag) {
            byName.set(material.tag, material);
        }

        const category = byCategory.get(material.category);

        if (category) {
            category.push(material);
        } else {
            byCategory.set(material.category, [material]);
        }
    }

    return {
        byId,
        byName,
        byCategory,
    };
}
// Create lookup functions backed by a precomputed material index.
function createMaterialResolvers(materials: Material[]): MaterialResolvers {
    const { byId, byName, byCategory } = createMaterialIndex(materials);

    return {
        getMaterial(material: string | number) {
            return (
                byId.get(`${material}`) ??
                (typeof material === "string"
                    ? byName.get(material)
                    : undefined) ??
                defaultMaterial
            );
        },
        getMaterialCategory(category: string) {
            return byCategory.get(category) ?? [];
        },
    };
}

/**
 * Precompute resolvers for all materials and released materials,
 * then select the appropriate set based on the user's unreleased content setting.
 */
export function createGameMaterialResolvers(
    materials: Material[],
    game: GameNoUma,
): (hideUnreleasedContent?: boolean) => MaterialResolvers {
    const all = createMaterialResolvers(materials);

    const released = createMaterialResolvers(
        materials.filter((material) =>
            isUnreleasedContent(material.release.version, game),
        ),
    );

    return (hideUnreleasedContent = false) =>
        hideUnreleasedContent ? released : all;
}
