// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { NTECharacter } from "@/types/nte/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: NTECharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rarity",
        element: "Element",
        weaponType: "Arc Type",
        nation: "Faction",
        release: "Release Date",
    };

    function createRow(character: NTECharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.displayName,
                    titleProps: { variant: "body1" },
                    icon: `nte/espers/${character.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `espers/${formatHref(character.url)}`,
                },
            },
            rarity: {
                label: {
                    title: (
                        <RarityStars
                            rarity={character.rarity}
                            useRarityColor
                            variant="h6"
                        />
                    ),
                    titleProps: { variant: "h6" },
                },
            },
            element: {
                label: {
                    title: character.element,
                    icon: `nte/elements/${character.element}`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `nte/icons/arcs/${character.weaponType}`,
                },
            },
            nation: {
                label: {
                    title: character.faction || "---",
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
            title="Esper"
            defaultSortBy="release"
            loading={loading}
        />
    );
}
