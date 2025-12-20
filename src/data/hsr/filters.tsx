// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { createFilterButtons } from "@/helpers/filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { elements, rarities, weapons, worlds } from "@/data/hsr/common";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import { HSRElement, HSRRarity, HSRWeaponType, HSRWorld } from "@/types/hsr";

export function hsrFilters<T extends Filters>({
    key,
    filters,
    setFilters,
    hideUnreleasedContent = false,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).hsr;

    return {
        element: {
            name: "Combat Type",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "hsr/elements",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: HSRElement[]) =>
                setFilters(key, "element", newValues),
        },
        weaponType: {
            name: "Path",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "hsr/paths",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: HSRWeaponType[]
            ) => setFilters(key, "weaponType", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarities
                .slice(0, key === "hsr/characters" ? -3 : undefined)
                .map((rarity) => ({
                    value: rarity,
                    label: (
                        <RarityStars
                            rarity={rarity}
                            useRarityColor
                            variant="h6"
                        />
                    ),
                })),
            onChange: (_: React.BaseSyntheticEvent, newValues: HSRRarity[]) =>
                setFilters(key, "rarity", newValues),
            padding: "4px 8px",
        },
        calyxMat: {
            name: "Calyx Material",
            value: filters.calyxMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("calyx")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("calyx").find(
                        (material) => material.tag === `${item}3`
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("calyx").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "calyxMat", newValues),
        },
        commonMat: {
            name: "Common Material",
            value: filters.commonMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === `${item}3`
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "commonMat", newValues),
        },
        bossMat: {
            name: "Boss Material",
            value: filters.bossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || ""
                ),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "bossMat", newValues),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || ""
                ),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weeklyBossMat", newValues),
        },
        nation: {
            name: "World",
            value: filters.nation,
            buttons: createFilterButtons({
                items: worlds,
                url: "hsr/factions",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: HSRWorld[]) =>
                setFilters(key, "nation", newValues),
        },
    };
}
