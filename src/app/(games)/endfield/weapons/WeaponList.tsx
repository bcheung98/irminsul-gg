// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { formatHref } from "@/utils";
import { baseATKScaling, weaponSubStats } from "@/data/endfield/weaponStats";

// Type imports
import type { EndfieldWeapon } from "@/types/endfield/weapon";
import type { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function WeaponList({
    weapons,
    loading,
}: {
    weapons: EndfieldWeapon[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rarity",
        weaponType: "Weapon Type",
        baseATK: "Base ATK",
        mainAttr: "Primary Attr.",
        secondaryAttr: "Secondary Attr.",
        essence: "Essence",
        version: "Release",
    };

    function createRow(weapon: EndfieldWeapon): SortTableRow {
        const atk = weapon.stats.atk;
        const baseATK = baseATKScaling[atk].slice(-1)[0];

        const stats = weapon.stats;
        const mainAttr = stats.attributes.primary;
        const secondaryAttr = stats.attributes.secondary;

        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "subtitle1" },
                    icon: `endfield/weapons/${weapon.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: weapon.url ? `weapons/${formatHref(weapon.url)}` : "",
                },
            },
            rarity: {
                label: {
                    title: (
                        <RarityStars
                            rarity={weapon.rarity}
                            useRarityColor
                            variant="h6"
                        />
                    ),
                    titleProps: { variant: "h6" },
                },
            },
            weaponType: {
                label: {
                    title: weapon.weaponType,
                    icon: `endfield/skills/Attack_${weapon.weaponType}`,
                    spacing: 1,
                },
            },
            baseATK: {
                label: {
                    title: baseATK || "?",
                },
            },
            mainAttr: {
                label: {
                    title: `${weaponSubStats[mainAttr.stat].title} [${mainAttr.scaling}]`,
                    icon: `endfield/icons/stat-icons/${weaponSubStats[mainAttr.stat].icon}`,
                    spacing: 0,
                },
            },
            secondaryAttr: {
                label: {
                    title: secondaryAttr
                        ? `${weaponSubStats[secondaryAttr.stat].title} [${secondaryAttr.scaling}]`
                        : "-",
                    icon: secondaryAttr
                        ? `endfield/icons/stat-icons/${weaponSubStats[secondaryAttr.stat].icon}`
                        : "",
                    spacing: 0,
                },
            },
            essence: {
                label: {
                    title: stats.passive?.tag || "-",
                    icon: `endfield/essences/${stats.passive?.tag}`,
                    spacing: 0,
                },
            },
            version: {
                label: {
                    title: `${weapon.release.version}`,
                },
            },
        };
    }

    return (
        <SortTable
            columns={columns}
            items={weapons}
            createRow={createRow}
            title="Weapon"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
