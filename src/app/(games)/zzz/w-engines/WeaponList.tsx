// Component imports
import SortTable from "@/components/SortTable";

// Helper imports
import { formatHref } from "@/utils";
import { rarityMap } from "@/data/zzz/common";
import { weaponMainStats, weaponSubStats } from "@/data/zzz/weaponStats";

// Type imports
import { ZZZWeapon } from "@/types/zzz/weapon";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function WeaponList({
    weapons,
    loading,
}: {
    weapons: ZZZWeapon[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rank",
        weaponType: "Specialty",
        baseATK: "Base Stat",
        subStat: "Advanced Stat",
        version: "Release",
    };

    function createRow(weapon: ZZZWeapon): SortTableRow {
        const mainStat = weapon.stats.mainStat.type;
        const mainStatValue =
            weaponMainStats[weapon.stats.mainStat.type].scaling[
                weapon.stats.mainStat.value
            ].slice(-1)[0];
        const mainStatLabel = `${mainStat}: ${mainStatValue}`;
        const subStat = weapon.stats.subStat;
        const subStatLabel = subStat
            ? `${subStat} ${
                  weaponSubStats[subStat].scaling[
                      weapon.rarity as 5 | 4 | 3
                  ]?.slice(-1)[0]
              }`
            : "---";
        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "body1" },
                    icon: `zzz/w-engines/${weapon.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `w-engines/${formatHref(weapon.url)}`,
                },
            },
            rarity: {
                label: {
                    icon: `zzz/ranks/item/${rarityMap[weapon.rarity]}`,
                },
            },
            weaponType: {
                label: {
                    title: weapon.weaponType,
                    icon: `zzz/icons/specialties/${weapon.weaponType}`,
                    spacing: 1,
                },
            },
            baseATK: {
                label: {
                    title: mainStatLabel,
                },
            },
            subStat: {
                label: {
                    title: subStatLabel,
                    icon: subStat && `zzz/icons/stat-icons/${subStat}`,
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
            title="W-Engine"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
