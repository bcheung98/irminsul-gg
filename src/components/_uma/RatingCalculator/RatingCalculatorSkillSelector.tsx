import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import SearchBar from "@/components/SearchBar";
import MenuItem from "@/components/MenuItem";
import {
    List,
    RowComponentProps,
    useListRef,
    ListImperativeAPI,
} from "react-window";

// MUI imports
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SxProps, Theme } from "@mui/material/styles";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";

// Helper imports
import { sortBy } from "@/utils";
import { useUmaContext } from "@/context";
import { matchSorter } from "match-sorter";

// Type imports
import { UmaSkillOption } from "@/types/uma/calculator";

const LISTBOX_PADDING = 8; // px

type ItemData = Array<
    | {
          key: number;
          group: string;
          children: React.ReactNode;
      }
    | [React.ReactElement, string, number]
>;

function RowComponent({
    index,
    itemData,
    style,
}: RowComponentProps & {
    itemData: ItemData;
}) {
    const theme = useTheme();

    const dataSet = itemData[index];

    if ("group" in dataSet) {
        return (
            <ListSubheader key={dataSet.key} component="div" style={style}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    const { key, ...optionProps } = dataSet[0];

    return (
        <MenuItem
            key={key}
            {...optionProps}
            sx={{
                ...style,
                "&:hover": {
                    backgroundColor: theme.background(1, "light"),
                },
                "&:not(:last-child)": {
                    borderBottom: `1px solid ${theme.border.color.primary}`,
                },
            }}
        >
            <TextLabel
                title={dataSet[1]}
                icon={`uma/skills/${dataSet[2]}`}
                titleProps={{ variant: "subtitle1", weight: "highlight" }}
                iconProps={{ size: 24 }}
            />
        </MenuItem>
    );
}

const ListboxComponent = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement> & {
        internalListRef: React.Ref<ListImperativeAPI>;
        onItemsBuilt: (optionIndexMap: Map<string, number>) => void;
    }
>(function ListboxComponent(props, ref) {
    const { children, internalListRef, onItemsBuilt, ...other } = props;
    const itemData: ItemData = [];
    const optionIndexMap = useMemo(() => new Map<string, number>(), []);

    (children as ItemData).forEach((item) => {
        itemData.push(item);
        if ("children" in item && Array.isArray(item.children)) {
            itemData.push(...item.children);
        }
    });

    // Map option values to their indices in the flattened array
    itemData.forEach((item, index) => {
        if (Array.isArray(item) && item[1]) {
            optionIndexMap.set(item[1], index);
        }
    });

    useEffect(() => {
        if (onItemsBuilt) {
            onItemsBuilt(optionIndexMap);
        }
    }, [onItemsBuilt, optionIndexMap]);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = matches ? 36 : 48;

    const getChildSize = (child: ItemData[number]) => {
        if (child.hasOwnProperty("group")) {
            return 48;
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    // Separate className for List, other props for wrapper div (ARIA, handlers)
    const { className, style, ...otherProps } = other;

    return (
        <div ref={ref} {...otherProps}>
            <List
                className={className}
                listRef={internalListRef}
                key={itemCount}
                rowCount={itemCount}
                rowHeight={(index) => getChildSize(itemData[index])}
                rowComponent={RowComponent}
                rowProps={{ itemData }}
                style={{
                    height: getHeight() + 2 * LISTBOX_PADDING,
                    width: "100%",
                }}
                overscanCount={15}
                tagName="ul"
            />
        </div>
    );
});

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: "border-box",
        "& ul": {
            padding: 0,
            margin: 0,
        },
    },
});

export default function RatingCalculatorSkillSelector({
    character,
    options,
    values,
    handleChange,
    placeholder = "Add Skill",
}: {
    character: number | null;
    options: UmaSkillOption[];
    values: UmaSkillOption[];
    placeholder?: string;
    handleChange: (newValue: UmaSkillOption[] | null) => void;
}) {
    const theme = useTheme();

    const { skills } = useUmaContext();

    // Use react-window v2's useListRef hook for imperative API access
    const internalListRef = useListRef(null);
    const optionIndexMapRef = useRef<Map<UmaSkillOption, number>>(new Map());

    const handleItemsBuilt = useCallback(
        (optionIndexMap: Map<UmaSkillOption, number>) => {
            optionIndexMapRef.current = optionIndexMap;
        },
        [],
    );

    // Handle keyboard navigation by scrolling to highlighted option
    const handleHighlightChange = (
        _: React.SyntheticEvent,
        option: UmaSkillOption | null,
    ) => {
        if (option && internalListRef.current) {
            const index = optionIndexMapRef.current.get(option);
            if (index !== undefined) {
                internalListRef.current.scrollToRow({ index, align: "auto" });
            }
        }
    };

    const styles: SxProps<Theme> = (theme) => ({
        "& .MuiAutocomplete-inputRoot": {
            borderRadius: theme.contentBox.border.radius,
            p: 0,
        },
    });

    return (
        <Autocomplete
            sx={styles}
            multiple
            autoComplete
            disableListWrap
            disableClearable
            filterSelectedOptions
            options={[
                // Show selected items first (if selected options are not hidden)
                ...values,
                ...options.sort(
                    (a, b) => sortBy(b.icon, a.icon) || sortBy(b.id, a.id),
                ),
            ]}
            getOptionLabel={(option) =>
                option.name || option.nameJP || option.nameJPNative
            }
            filterOptions={(options, { inputValue }) =>
                filterOptions(options, inputValue)
            }
            value={values}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="No skills"
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    inputIcon={<></>}
                    placeholder={placeholder}
                    backgroundColor={theme.background(0)}
                />
            )}
            renderOption={(props, option, state) =>
                [
                    props,
                    option.name || option.nameJP || option.nameJPNative,
                    option.icon,
                    state,
                ] as React.ReactNode
            }
            onHighlightChange={handleHighlightChange}
            onChange={(event, newValue, reason) => {
                // Prevent clearing input when pressing Backspace/Delete
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Backspace" ||
                        (event as React.KeyboardEvent).key === "Delete") &&
                    reason === "removeOption"
                ) {
                    return;
                }
                // If another version of an already added skill is selected,
                // replace that skill with the newer version
                const option = newValue.slice(-1)[0];
                const skill = skills.find((skill) => skill.id === option.id);
                if (skill && skill.versions) {
                    skill.versions.forEach((id) => {
                        let index = values.findIndex((item) => item.id === id);
                        if (index !== -1) {
                            newValue.splice(index, 1, option);
                            newValue.splice(-1, 1);
                        }
                    });
                }
                handleChange(newValue);
            }}
            slots={{
                popper: StyledPopper,
            }}
            slotProps={{
                listbox: {
                    component: ListboxComponent,
                    internalListRef,
                    onItemsBuilt: handleItemsBuilt,
                } as any,
            }}
            renderValue={() => null}
        />
    );
}

function filterOptions(options: UmaSkillOption[], searchValue: string) {
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["name", "nameJP", "nameJPNative"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    }).sort((a, b) => sortBy(b.icon, a.icon) || sortBy(b.id, a.id));
}
