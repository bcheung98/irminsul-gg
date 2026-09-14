import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";

// Component imports
import { List, useListRef } from "react-window";

// MUI imports
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";

// Type imports
import {
    ItemData,
    VirtualizedListboxOptions,
    VirtualizedListboxProps,
    VirtualizedListboxSlotProps,
    VirtualizedRowComponentProps,
} from "./VirtualizedAutocomplete.types";

function VirtualizedListboxContent<T>(
    props: VirtualizedListboxProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        children,
        internalListRef,
        onItemsBuilt,
        desktopRowHeight,
        mobileRowHeight,
        groupRowHeight,
        maxHeightRows,
        listboxPadding,
        overscanCount,
        renderRow,
        ...other
    } = props;

    const { itemData, optionIndexMap } = useMemo(() => {
        const itemData: ItemData<T> = [];
        const optionIndexMap = new Map<T, number>();

        (children as ItemData<T>).forEach((item) => {
            itemData.push(item);
            if ("children" in item && Array.isArray(item.children)) {
                itemData.push(...item.children);
            }
        });

        itemData.forEach((item, index) => {
            if (Array.isArray(item)) {
                optionIndexMap.set(item[1], index);
            }
        });

        return { itemData, optionIndexMap };
    }, [children]);

    useEffect(() => {
        onItemsBuilt(optionIndexMap);
    }, [onItemsBuilt, optionIndexMap]);

    const theme = useTheme();

    const desktop = useMediaQuery(theme.breakpoints.up("sm"), {
        noSsr: true,
    });

    const optionHeight = desktop ? desktopRowHeight : mobileRowHeight;

    const getRowHeight = (item: ItemData<T>[number]) =>
        "group" in item ? groupRowHeight : optionHeight;

    const itemCount = itemData.length;

    const height =
        itemCount > maxHeightRows
            ? maxHeightRows * optionHeight
            : itemData.reduce((sum, item) => sum + getRowHeight(item), 0);

    const { className, style: _, ...otherProps } = other;

    return (
        <div ref={ref} {...otherProps}>
            <List
                className={className}
                listRef={internalListRef}
                rowCount={itemCount}
                rowHeight={(index) => getRowHeight(itemData[index])}
                rowComponent={VirtualizedRowComponent<T>}
                rowProps={{ itemData, listboxPadding, renderRow }}
                style={{
                    height: height + 2 * listboxPadding,
                    width: "100%",
                }}
                overscanCount={overscanCount}
                tagName="ul"
            />
        </div>
    );
}

function VirtualizedRowComponent<T>({
    index,
    itemData,
    listboxPadding,
    style,
    renderRow,
}: VirtualizedRowComponentProps<T>): React.ReactElement | null {
    const theme = useTheme();

    const item = itemData[index];

    if ("group" in item) {
        return (
            <ListSubheader key={item.key} component="div" style={style}>
                {item.group}
            </ListSubheader>
        );
    }

    const [{ key, ...optionProps }, option, disabled = false] = item;

    const itemCount = itemData.length;

    return renderRow({
        option,
        optionProps,
        disabled,
        index,
        itemCount,
        style: {
            ...style,
            top: ((style.top as number) ?? 0) + listboxPadding,
            borderBottom:
                index + 1 < itemCount
                    ? `1px solid ${theme.border.color.primary}`
                    : 0,
        },
    });
}

const VirtualizedListbox = forwardRef(VirtualizedListboxContent) as <T>(
    props: VirtualizedListboxProps<T> & {
        ref?: React.ForwardedRef<HTMLDivElement>;
    },
) => React.ReactElement;

export function createVirtualizedListbox<T>({
    desktopRowHeight = 40,
    mobileRowHeight = 48,
    groupRowHeight = 48,
    maxHeightRows = 8,
    listboxPadding = 8,
    overscanCount = 15,
    renderRow,
}: VirtualizedListboxOptions<T>) {
    return forwardRef<HTMLDivElement, VirtualizedListboxSlotProps<T>>(
        function VirtualizedListboxSlot(props, ref) {
            return (
                <VirtualizedListbox<T>
                    {...props}
                    ref={ref}
                    desktopRowHeight={desktopRowHeight}
                    mobileRowHeight={mobileRowHeight}
                    groupRowHeight={groupRowHeight}
                    maxHeightRows={maxHeightRows}
                    listboxPadding={listboxPadding}
                    overscanCount={overscanCount}
                    renderRow={renderRow}
                />
            );
        },
    );
}

export function useVirtualizedAutocomplete<T>() {
    const listRef = useListRef(null);

    const optionIndexMapRef = useRef<Map<T, number>>(new Map());

    const handleItemsBuilt = useCallback((optionIndexMap: Map<T, number>) => {
        optionIndexMapRef.current = optionIndexMap;
    }, []);

    const handleHighlightChange = useCallback(
        (_: React.SyntheticEvent, option: T | null) => {
            if (!option || !listRef.current) return;

            const index = optionIndexMapRef.current.get(option);

            if (index !== undefined) {
                listRef.current.scrollToRow({
                    index,
                    align: "auto",
                });
            }
        },
        [listRef],
    );

    return {
        listRef,
        handleItemsBuilt,
        handleHighlightChange,
    };
}

export const VirtualizedAutocompletePopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: "border-box",
        "& ul": {
            padding: 0,
            margin: 0,
        },
    },
});
