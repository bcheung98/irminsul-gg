// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { EndfieldCharacter } from "@/types/endfield/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: EndfieldCharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rarity",
        element: "Element",
        specialty: "Class",
        weaponType: "Weapon",
        nation: "Faction",
        release: "Release Date",
    };

    function createRow(character: EndfieldCharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.displayName,
                    titleProps: { variant: "body1" },
                    icon: `endfield/operators/${character.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `operators/${formatHref(character.url)}`,
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
                    icon: `endfield/elements/${character.element}`,
                },
            },
            specialty: {
                label: {
                    title: character.specialty,
                    icon: `endfield/classes/${character.specialty}`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `endfield/skills/Attack_${character.weaponType}`,
                },
            },
            nation: {
                label: {
                    title: character.faction,
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
            title="Operator"
            defaultSortBy="release"
            loading={loading}
        />
    );
}
