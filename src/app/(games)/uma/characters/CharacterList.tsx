// Component imports
import Text from "@/components/Text";
import SortTable from "@/components/SortTable";
import RarityStars from "@/components/RarityStars";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaCharacter } from "@/types/uma/character";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function CharacterList({
    characters,
    loading,
}: {
    characters: UmaCharacter[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rarity",
        turf: "Turf",
        dirt: "Dirt",
        sprint: "Sprint",
        mile: "Mile",
        medium: "Med",
        long: "Long",
        front: "Front",
        pace: "Pace",
        late: "Late",
        end: "End",
        release: "Release Date",
    };

    const aptitudeIconProps = { size: 24 };
    const rowPadding = "0px";

    function createRow(character: UmaCharacter): SortTableRow {
        return {
            name: {
                label: {
                    title: character.name,
                    titleProps: { variant: "body1" },
                    subtitle: (
                        <Text variant="body2" weight="highlight">
                            <i>[{character.title}]</i>
                        </Text>
                    ),
                    icon: `uma/characters/${character.id}_icon`,
                    iconProps: {
                        size: [48, 0],
                    },
                    href: `characters/${formatHref(character.url)}`,
                    textSpacing: 0.5,
                },
            },
            rarity: {
                label: {
                    title: (
                        <RarityStars rarity={character.rarity} variant="h6" />
                    ),
                    titleProps: { variant: "h6" },
                },
                padding: "4px",
            },
            turf: {
                label: {
                    icon: `uma/ranks/${character.aptitude.surface.turf}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            dirt: {
                label: {
                    icon: `uma/ranks/${character.aptitude.surface.dirt}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            sprint: {
                label: {
                    icon: `uma/ranks/${character.aptitude.distance.sprint}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            mile: {
                label: {
                    icon: `uma/ranks/${character.aptitude.distance.mile}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            medium: {
                label: {
                    icon: `uma/ranks/${character.aptitude.distance.medium}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            long: {
                label: {
                    icon: `uma/ranks/${character.aptitude.distance.long}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            front: {
                label: {
                    icon: `uma/ranks/${character.aptitude.strategy.front}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            pace: {
                label: {
                    icon: `uma/ranks/${character.aptitude.strategy.pace}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            late: {
                label: {
                    icon: `uma/ranks/${character.aptitude.strategy.late}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            end: {
                label: {
                    icon: `uma/ranks/${character.aptitude.strategy.end}`,
                    iconProps: aptitudeIconProps,
                },
                padding: rowPadding,
            },
            release: {
                label: {
                    title: `Global: ${
                        character.release.global
                            ? new DateObject(character.release.global, server)
                                  .string
                            : "---"
                    }`,
                    subtitle: (
                        <Text variant="body2">
                            {`Japan: ${
                                new DateObject(character.release.jp, server)
                                    .string
                            }`}
                        </Text>
                    ),
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
