// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { HSRCharacter } from "@/types/hsr/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: HSRCharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rarity",
        element: "Combat Type",
        weaponType: "Path",
        nation: "World",
        release: "Release Date",
    };

    function createRow(character: HSRCharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.displayName,
                    titleProps: { variant: "body1" },
                    icon: `hsr/characters/${character.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `characters/${formatHref(character.url)}`,
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
                    icon: `hsr/elements/${character.element}`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `hsr/paths/${character.weaponType}`,
                },
            },
            nation: {
                label: {
                    title: character.world,
                    icon: `hsr/factions/${character.world}`,
                    iconProps: {
                        size: 32,
                        supressLoadImageWarning: true,
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
            title="Character"
            defaultSortBy="release"
            loading={loading}
        />
    );
}
