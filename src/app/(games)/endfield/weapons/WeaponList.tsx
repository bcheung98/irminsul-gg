// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { formatHref } from "@/utils";
import { baseATKScaling } from "@/data/endfield/weaponStats";

// Type imports
import { EndfieldWeapon } from "@/types/endfield/weapon";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

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
        version: "Release",
    };

    function createRow(weapon: EndfieldWeapon): SortTableRow {
        const atk = weapon.stats.atk;
        const baseATK = baseATKScaling[atk].slice(-1)[0];

        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "body1" },
                    icon: `endfield/weapons/${weapon.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `weapons/${formatHref(weapon.url)}`,
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
                    title: baseATK,
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
