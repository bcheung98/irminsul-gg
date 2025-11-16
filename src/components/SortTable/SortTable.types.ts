import { BaseData, SortOrder } from "@/types";
import { CellProps } from "@/components/Table";

export interface SortTableCellProps extends CellProps {
    href?: string;
}

export interface ColumnHeaders {
    [key: string]: string;
}

export interface SortTableProps<T extends ColumnHeaders, U extends BaseData> {
    columns: T;
    items: U[];
    createRow: (value: U) => SortTableRow;
    title?: string;
    defaultSortBy?: keyof T;
    defaultSortOrder?: SortOrder;
    isPending?: boolean;
}

export interface SortTableHeadProps<T extends ColumnHeaders> {
    columns: T;
    sortBy: keyof T;
    sortOrder: SortOrder;
    handleRequestSort: (key: keyof T) => () => void;
}

export type SortTableRow = Record<string, SortTableCellProps>;

export interface SortTableRowProps<T> {
    row: Record<keyof T, SortTableCellProps>;
}
