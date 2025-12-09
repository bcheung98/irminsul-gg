// Component imports
import * as Table from "@/components/Table";

// MUI imports
import Card from "@mui/material/Card";

// Helper imports
import DateObject from "@/helpers/dates";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { AttributeDataMisc, GameData, Server } from "@/types";

export default function CharacterInfoMisc(props: AttributeDataMisc) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const rows = getRows(props, server)[game];

    const cellProps = {
        borderColor: "transparent",
        padding: "2px 16px",
    };

    return (
        <Table.Container
            component={Card}
            sx={(theme) => ({
                py: "8px",
                borderRadius: theme.contentBox.border.radius,
            })}
        >
            <Table.Root size="small">
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.key} color="secondary">
                            <Table.Cell
                                align="left"
                                label={{ title: row.key }}
                                {...cellProps}
                            />
                            <Table.Cell
                                align="right"
                                label={{ title: row.value || "???" }}
                                {...cellProps}
                            />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.Container>
    );
}

function getRows(
    attributes: AttributeDataMisc,
    server: Server | undefined
): GameData<{ key: string; value: string | undefined }[]> {
    const releaseDate = attributes.release?.date
        ? new DateObject(attributes.release.date, server).string
        : "";
    const releaseVersion = attributes.release?.version;

    return {
        genshin: [
            { key: "Constellation", value: attributes.constellation },
            { key: "Nation", value: attributes.nation },
            { key: "Birthday", value: attributes.birthday },
            { key: "Release", value: `${releaseDate} (${releaseVersion})` },
            {
                key: "Voice Actor (EN)",
                value: attributes.voiceActors?.en,
            },
            {
                key: "Voice Actor (JP)",
                value: attributes.voiceActors?.jp,
            },
        ],
        hsr: [
            { key: "Faction", value: attributes.faction },
            { key: "Release", value: `${releaseDate} (${releaseVersion})` },
            {
                key: "Voice Actor (EN)",
                value: attributes.voiceActors?.en,
            },
            {
                key: "Voice Actor (JP)",
                value: attributes.voiceActors?.jp,
            },
        ],
        wuwa: [
            { key: "Nation", value: attributes.nation },
            { key: "Release", value: `${releaseDate} (${releaseVersion})` },
            {
                key: "Voice Actor (EN)",
                value: attributes.voiceActors?.en,
            },
            {
                key: "Voice Actor (JP)",
                value: attributes.voiceActors?.jp,
            },
        ],
        zzz: [
            { key: "Release", value: `${releaseDate} (${releaseVersion})` },
            {
                key: "Voice Actor (EN)",
                value: attributes.voiceActors?.en,
            },
            {
                key: "Voice Actor (JP)",
                value: attributes.voiceActors?.jp,
            },
        ],
        uma: [],
    };
}
