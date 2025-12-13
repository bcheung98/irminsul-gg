// Component imports
import SortTable from "@/components/SortTable";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { rarityMap } from "@/data/zzz/common";

// Type imports
import { ZZZCharacter } from "@/types/zzz/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: ZZZCharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rank",
        element: "Attribute",
        weaponType: "Specialty",
        attackType: "Attack Type",
        nation: "Faction",
        release: "Release Date",
    };

    function createRow(character: ZZZCharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.displayName,
                    titleProps: { variant: "body1" },
                    icon: `zzz/agents/${character.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `agents/${formatHref(character.url)}`,
                },
            },
            rarity: {
                label: {
                    icon: `zzz/ranks/agent/${rarityMap[character.rarity]}`,
                },
            },
            element: {
                label: {
                    title: character.subElement || character.element,
                    icon: `zzz/elements/${
                        character.subElement || character.element
                    }`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `zzz/icons/specialties/${character.weaponType}`,
                },
            },
            attackType: {
                label: {
                    title: character.attackType[0],
                    icon: `zzz/icons/attack-types/${character.attackType[0]}`,
                },
            },
            nation: {
                label: {
                    title: character.faction,
                    icon: `zzz/factions/${character.faction}`,
                    iconProps: {
                        size: 32,
                    },
                },
            },
            release: {
                label: {
                    title: `${
                        new DateObject(character.release.date, server).string
                    } (${character.release.version})`,
                },
            },
        };
    }

    return (
        <SortTable
            columns={columns}
            items={characters}
            createRow={createRow}
            title="Agent"
            defaultSortBy="release"
            loading={loading}
        />
    );
}
