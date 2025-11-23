// Component imports
import TextLabel from "@/components/TextLabel";
import * as Table from "@/components/Table";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";

// Type imports
import { TextLabelProps } from "@/components/TextLabel/TextLabel.types";
import { ColumnHeaders, SortTableRowProps } from "./SortTable.types";

export default function SortTableRow<T extends ColumnHeaders>({
    row,
}: SortTableRowProps<T>) {
    const theme = useTheme();

    const labelProps: TextLabelProps = {
        titleProps: {
            variant: "body2",
        },
        spacing: 2,
        iconProps: {
            size: 28,
        },
    };

    return (
        <Table.Row
            color="secondary"
            sx={{
                backgroundColor: alpha(
                    theme.contentBox.backgroundColor.main,
                    0.95
                ),
            }}
        >
            {Object.entries(row).map(([key, value], index) => (
                <TableCell
                    key={`${key}.${index}`}
                    sx={{
                        p: "8px 16px",
                        borderColor: theme.border.color.primary,
                    }}
                >
                    <TextLabel
                        {...{
                            ...labelProps,
                            ...value.label,
                        }}
                    />
                </TableCell>
            ))}
        </Table.Row>
    );
}
