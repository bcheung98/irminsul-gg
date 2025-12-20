// Component imports
import Text from "@/components/Text";
import * as Table from "@/components/Table";

// MUI imports
import { useTheme } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Type imports
import { ColumnHeaders, SortTableHeadProps } from "./SortTable.types";

export default function SortTableHead<T extends ColumnHeaders>({
    rows,
    columns,
    sortBy,
    sortOrder,
    handleRequestSort,
}: SortTableHeadProps<T>) {
    const theme = useTheme();

    let rowLength = 0;
    if (rows.length > 0) {
        rowLength = Object.keys(rows[0]).length;
    } else {
        return null;
    }

    return (
        <TableHead>
            <Table.Row
                color="tertiary"
                sx={{
                    borderBottom: `1px solid ${theme.border.color.primary}`,
                }}
            >
                {Object.entries(columns).map(([key, value], index) => (
                    <TableCell
                        key={value}
                        sx={{
                            p:
                                rows.length > 0 &&
                                (index === 0 || index === rowLength - 1)
                                    ? "4px 16px"
                                    : rows[0][key].padding ?? "4px 16px",
                        }}
                    >
                        <TableSortLabel
                            active={key === sortBy}
                            direction={key === sortBy ? sortOrder : "asc"}
                            onClick={handleRequestSort(key)}
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                "& .MuiTableSortLabel-icon": {
                                    fill:
                                        key === sortBy
                                            ? theme.border.color.highlight
                                            : "grey",
                                    opacity: 0,
                                },
                            }}
                        >
                            <Text
                                variant="body2"
                                sx={{ fontWeight: theme.font.weight.highlight }}
                            >
                                {value}
                            </Text>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </Table.Row>
        </TableHead>
    );
}
