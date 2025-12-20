// Component imports
import * as Table from "@/components/Table";

// MUI imports
import Card from "@mui/material/Card";

// Type imports
import { Skill } from "@/types/skill";

export default function CharacterCoreSkillScaling({
    value,
    ascension,
}: {
    value: number;
    ascension: Skill;
}) {
    if (!ascension.scaling) return null;

    return (
        <Table.Container
            component={Card}
            sx={{ minWidth: "25%", width: "max-content" }}
        >
            <Table.Root>
                <Table.Body>
                    {ascension.scaling.map((stat, index) =>
                        !["0", "0%"].includes(stat[value]) ? (
                            <Table.Row
                                key={index}
                                sx={(theme) => ({
                                    backgroundColor: theme.background(
                                        0,
                                        "light"
                                    ),
                                })}
                            >
                                <Table.Cell
                                    align="left"
                                    label={{ title: stat[0] }}
                                    padding="8px 16px"
                                />
                                <Table.Cell
                                    align="right"
                                    label={{ title: stat[value] }}
                                    padding="8px 16px"
                                />
                            </Table.Row>
                        ) : null
                    )}
                </Table.Body>
            </Table.Root>
        </Table.Container>
    );
}
