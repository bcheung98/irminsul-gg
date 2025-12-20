// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { formatHref } from "@/utils";
import { weaponStats } from "@/data/hsr/weaponStats";

// Type imports
import { HSRWeapon } from "@/types/hsr/weapon";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function WeaponList({
    weapons,
    loading,
}: {
    weapons: HSRWeapon[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rarity",
        weaponType: "Path",
        HP: "HP",
        ATK: "ATK",
        DEF: "DEF",
        version: "Release",
    };

    function createRow(weapon: HSRWeapon): SortTableRow {
        const hp = weaponStats.hp[weapon.stats.hp].slice(-1)[0];
        const atk = weaponStats.atk[weapon.stats.atk].slice(-1)[0];
        const def = weaponStats.def[weapon.stats.def].slice(-1)[0];
        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "body1" },
                    icon: `hsr/lightcones/${weapon.id}_icon`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `lightcones/${formatHref(weapon.url)}`,
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
                    icon: `hsr/paths/${weapon.weaponType}`,
                    spacing: 1,
                },
            },
            HP: {
                label: {
                    title: hp,
                },
            },
            ATK: {
                label: {
                    title: atk,
                },
            },
            DEF: {
                label: {
                    title: def,
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
            title="Light Cone"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
