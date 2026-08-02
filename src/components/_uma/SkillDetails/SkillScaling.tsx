// Component imports
import Text from "@/components/Text";
import * as Table from "@/components/Table";

// MUI imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Type imports
import { UmaSkillEffects } from "@/types/uma/skill";

export default function SkillScaling({ effect }: { effect: UmaSkillEffects }) {
    return (
        <Stack spacing={1}>
            <Text variant="body2">{`Base value: ${effect.value}`}</Text>
            <Text variant="body2">{effect.valueScaling?.description}</Text>
            <Table.Container component={Card}>
                <Table.Root>
                    <Table.Head
                        data={[
                            effect.valueScaling?.title || "",
                            "Multiplier",
                            "Total",
                        ]}
                    />
                    <Table.Body>
                        {getValues({
                            base: effect.value,
                            values: effect.valueScaling?.values,
                        }).map((row, i) => (
                            <Table.Row key={i}>
                                {row.map((r, idx) => (
                                    <Table.Cell
                                        key={idx}
                                        label={{
                                            title: r,
                                        }}
                                    />
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.Container>
        </Stack>
    );
}

function getValues({
    base,
    values,
}: {
    base: number;
    values?: [string, number][];
}) {
    if (!values) return [];
    return values.map((row) => [
        row[0],
        `${row[1]}x`,
        `${parseFloat((base * row[1]).toFixed(3))}`,
    ]);
}
