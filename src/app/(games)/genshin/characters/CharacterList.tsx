// Component imports
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: GenshinCharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

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
                    title: character.displayName,
                    titleProps: { variant: "body1" },
                    icon: `genshin/characters/${character.id}`,
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
                    icon: `genshin/elements/${character.element}`,
                },
            },
            weaponType: {
                label: {
                    title: character.weaponType,
                    icon: `genshin/skills/Attack_${character.weaponType}`,
                },
            },
            ascensionStat: {
                label: {
                    title: characterAscensionStats[
                        character.stats.ascensionStat
                    ].title,
                    icon: `genshin/icons/stat-icons/${character.stats.ascensionStat}`,
                },
            },
            nation: {
                label: {
                    title: character.nation,
                    icon: `genshin/nations/${character.nation}`,
                    iconProps: {
                        size: 32,
                        supressLoadImageWarning: true,
                        fallbackSrc: "genshin/nations/Outlander",
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
