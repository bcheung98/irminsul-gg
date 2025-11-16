// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { convertNametoURL, splitJoin } from "@/utils";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    isPending,
}: {
    characters: GenshinCharacter[];
    isPending?: boolean;
}) {
    const columns = {
        name: "Name",
        rarity: "Rarity",
        element: "Element",
        weaponType: "Weapon",
        ascensionStat: "Ascension Stat",
        nation: "Nation",
        release: "Release Date",
    };

    function createRow(character: GenshinCharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.fullName,
                    titleProps: { variant: "body1" },
                    icon: `genshin/characters/avatars/${splitJoin(
                        character.name
                    )}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    isLink: true,
                },
                href: `characters/${convertNametoURL(character.name)}`,
            },
            rarity: {
                label: {
                    title: (
                        <RarityStars rarity={character.rarity} variant="h6" />
                    ),
                    titleProps: { variant: "h6" },
                },
            },
            element: {
                label: {
                    title: character.element,
                    icon: `genshin/elements/${character.element}`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `genshin/weapons/icons/${character.weaponType}`,
                },
            },
            ascensionStat: {
                label: {
                    title: characterAscensionStats[
                        character.stats.ascensionStat
                    ].title,
                    icon: `genshin/icons/ascension_stats/${character.stats.ascensionStat}`,
                },
            },
            nation: {
                label: {
                    title: character.nation,
                    icon: `genshin/nations/${character.nation}`,
                    iconProps: {
                        size: 32,
                    },
                },
            },
            release: {
                label: {
                    title: `${new DateObject(character.release.date).string} (${
                        character.release.version
                    })`,
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
            isPending={isPending}
        />
    );
}
