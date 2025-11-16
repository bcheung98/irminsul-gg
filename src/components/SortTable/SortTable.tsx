import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import * as Table from "@/components/Table";
import SortTableHead from "./SortTableHead";
import SortTableRow from "./SortTableRow";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

// Helper imports
import { countText, objectKeys, range } from "@/utils";
import { useGameTag } from "@/context";
import { useSort } from "@/helpers/sort";

// Type imports
import { BaseData, SortOrder } from "@/types";
import { ColumnHeaders, SortTableProps } from "./SortTable.types";

export default function SortTable<T extends ColumnHeaders, U extends BaseData>({
    columns,
    items,
    createRow,
    title = "",
    defaultSortBy,
    defaultSortOrder = "asc",
    loading,
}: SortTableProps<T, U>) {
    const theme = useTheme();

    const game = useGameTag();

    const [sortBy, setSortBy] = useState<keyof T>(
        defaultSortBy || objectKeys(columns)[0]
    );
    const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);

    const handleRequestSort = (key: keyof T) => () => {
        const isAsc = sortBy === key && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortBy(key);
    };

    const rows = useSort()
        [game]({
            items,
            value: sortBy.toString(),
            reverse: sortOrder === "desc",
        })
        .map((item) => createRow(item));

    return (
        <ContentBox
            header={countText({
                count: rows.length,
                single: title,
                showCount: true,
            })}
            contentProps={{ padding: 0 }}
        >
            <Table.Container>
                <Table.Root>
                    <SortTableHead
                        columns={columns}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        handleRequestSort={handleRequestSort}
                    />
                    <Table.Body>
                        {rows.map((row, index) =>
                            loading ? (
                                <Table.Row key={index}>
                                    {range(objectKeys(columns).length).map(
                                        (i) => (
                                            <td
                                                key={i}
                                                style={{
                                                    padding: "4px 0px",
                                                }}
                                            >
                                                <Skeleton
                                                    height={64}
                                                    variant="rectangular"
                                                    sx={{
                                                        backgroundColor:
                                                            theme.background(1),
                                                    }}
                                                />
                                            </td>
                                        )
                                    )}
                                </Table.Row>
                            ) : (
                                <SortTableRow key={index} row={row} />
                            )
                        )}
                    </Table.Body>
                </Table.Root>
            </Table.Container>
        </ContentBox>
    );
}
