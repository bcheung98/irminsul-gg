export interface CustomMaterial {
    name: string;
    rarities: number[];
}

export interface ResolvedCustomMaterial {
    id: string;
    name: string;
    rarity?: number;
}

export type CustomMaterials = Record<string, CustomMaterial>;

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
