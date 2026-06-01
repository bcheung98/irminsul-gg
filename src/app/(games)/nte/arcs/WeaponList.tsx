// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { formatHref } from "@/utils";
import {
    baseATKScaling,
    subStats,
    weaponSubStats,
} from "@/data/nte/weaponStats";

// Type imports
import { NTEWeapon } from "@/types/nte";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function WeaponList({
    weapons,
    loading,
}: {
    weapons: NTEWeapon[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rarity",
        weaponType: "Arc Type",
        baseATK: "Base ATK",
        subStat: "Substat",
        version: "Release",
    };

    function createRow(weapon: NTEWeapon): SortTableRow {
        const atk = weapon.stats.atk;
        const baseATK = baseATKScaling[atk].slice(-1)[0];
        const subStat = weapon.stats.subStat;
        const subStatLabel = subStat
            ? `${weaponSubStats[subStat].title} ${subStats[atk][subStat]?.slice(-1)[0]}`
            : "---";
        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "body1" },
                    icon: `nte/arcs/${weapon.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `arcs/${formatHref(weapon.url)}`,
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
                    icon: `nte/icons/arcs/${weapon.weaponType}`,
                    spacing: 1,
                },
            },
            baseATK: {
                label: {
                    title: baseATK,
                },
            },
            subStat: {
                label: {
                    title: subStatLabel,
                    icon: subStat && `nte/icons/stat-icons/${subStat}`,
                    spacing: 1,
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
            title="Arc"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
