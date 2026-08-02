// Component imports
import * as Table from "@/components/Table";
import SupportEffectsTableRow from "./SupportEffectsTableRow";

// MUI imports
import Card from "@mui/material/Card";

// Type imports
import { SupportEffect } from "@/types/uma/support";

export default function SupportEffectsTable({
    effects,
    levels,
}: {
    effects: SupportEffect[];
    levels: number[];
}) {
    const rows = effects.map((row) => [row.effect, ...row.values.slice(-5)]);

    return (
        <Table.Container component={Card}>
            <Table.Root>
                <Table.Head
                    data={[
                        "",
                        ...levels.slice(-5).map((level) => `Lvl ${level}`),
                    ]}
                />
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row[0]}>
                            {row.map((value, i) => (
                                <SupportEffectsTableRow
                                    key={i}
                                    effect={`${row[0]}`}
                                    value={value}
                                    index={i}
                                />
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.Container>
    );
}
