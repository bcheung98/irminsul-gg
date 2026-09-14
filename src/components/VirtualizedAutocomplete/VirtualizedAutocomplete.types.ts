import { ListImperativeAPI, RowComponentProps } from "react-window";

export type GroupItem = {
    key: React.Key;
    group: string;
    children: React.ReactNode;
};

export type OptionItem<T> = [
    React.HTMLAttributes<HTMLLIElement> & {
        key: React.Key;
    },
    T,
    boolean?,
];

export type ItemData<T> = Array<GroupItem | OptionItem<T>>;

export interface VirtualizedRowProps<T> {
    option: T;
    optionProps: React.HTMLAttributes<HTMLLIElement>;
    disabled: boolean;
    index: number;
    itemCount: number;
    style: React.CSSProperties;
}

export type RenderRow<T> = (
    props: VirtualizedRowProps<T>,
) => React.ReactElement | null;

export type VirtualizedRowComponentProps<T> = RowComponentProps & {
    itemData: ItemData<T>;
    listboxPadding: number;
    renderRow: RenderRow<T>;
};

interface VirtualizedListboxConfig<T> {
    desktopRowHeight: number;
    mobileRowHeight: number;
    groupRowHeight: number;
    maxHeightRows: number;
    listboxPadding: number;
    overscanCount: number;
    renderRow: RenderRow<T>;
}

export type VirtualizedListboxSlotProps<T> =
    React.HTMLAttributes<HTMLElement> & {
        internalListRef: React.Ref<ListImperativeAPI>;
        onItemsBuilt: (optionIndexMap: Map<T, number>) => void;
    };

export type VirtualizedListboxProps<T> = VirtualizedListboxSlotProps<T> &
    VirtualizedListboxConfig<T>;

export type VirtualizedListboxOptions<T> = Partial<
    Omit<VirtualizedListboxConfig<T>, "renderRow">
> &
    Pick<VirtualizedListboxConfig<T>, "renderRow">;
