// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { formatHref, splitJoin } from "@/utils";
import { baseATKScaling, subStats } from "@/data/genshin/weaponStats";

// Type imports
import { GenshinWeapon } from "@/types/genshin/weapon";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function WeaponList({
    weapons,
    loading,
}: {
    weapons: GenshinWeapon[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rarity",
        weaponType: "Weapon Type",
        baseATK: "Base ATK",
        subStat: "Substat",
        version: "Release",
    };

    function createRow(weapon: GenshinWeapon): SortTableRow {
        const atk = weapon.stats.atk;
        const baseATK = baseATKScaling[atk].slice(-1)[0];
        const subStat = weapon.stats.subStat;
        const subStatLabel = subStat
            ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
            : "---";
        return {
            name: {
                label: {
                    title: weapon.displayName,
                    titleProps: { variant: "body1" },
                    icon: `genshin/weapons/${splitJoin(weapon.name)}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    isLink: true,
                },
                href: `weapons/${formatHref(weapon.url)}`,
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
                    icon: `genshin/weapons/icons/${weapon.weaponType}`,
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
                    icon: subStat && `genshin/icons/ascension_stats/${subStat}`,
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
            title="Weapon"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
