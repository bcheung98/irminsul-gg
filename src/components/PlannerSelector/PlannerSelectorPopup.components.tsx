import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { matchSorter } from "match-sorter";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SearchBar from "@/components/SearchBar";
import PlannerCardHeader from "@/components/PlannerCardRoot/PlannerCardHeader";
import ToggleButtons from "@/components/ToggleButtons";
import ContentDialog from "@/components/ContentDialog";
import MenuItem from "@/components/MenuItem";
import {
    createVirtualizedListbox,
    useVirtualizedAutocomplete,
    VirtualizedAutocompletePopper,
    VirtualizedRowProps,
} from "@/components/VirtualizedAutocomplete";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { objectKeys, sortBy } from "@/utils";
import { formatMaterialKey, getOption } from "./PlannerSelector.utils";
import { useFilterGroups } from "@/components/Filters";

// Type imports
import type { GameNoUma, Item } from "@/types";
import type { PlannerItemData, PlannerType } from "@/types/planner";
import type { FilterGroup, FilterKey } from "@/types/filters";

interface SearchResultsProps {
    hits: PlannerItemData[];
    searchValue: string;
    categoryLabel: string;
    type: PlannerType;
    isPending: boolean;
    handleSelect: (option: PlannerItemData | null) => void;
    sampleItem: PlannerItemData;
    groups: FilterGroup[];
}

export function Loader() {
    return (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );
}

export function SearchResults({
    hits,
    searchValue,
    categoryLabel,
    type,
    isPending,
    handleSelect,
    sampleItem,
    groups,
}: SearchResultsProps) {
    return hits.length > 0 || searchValue === "" ? (
        <SearchContent
            hits={hits}
            categoryLabel={categoryLabel}
            type={type}
            isPending={isPending}
            handleSelect={handleSelect}
            sampleItem={sampleItem}
            groups={groups}
        />
    ) : (
        <NoHits searchValue={searchValue} isPending={isPending} />
    );
}

const CUSTOM_ITEMS_ENABLED_GAMES = new Set<GameNoUma>([
    "genshin",
    "hsr",
    "wuwa",
]);

function SearchContent({
    hits,
    categoryLabel,
    type,
    isPending,
    handleSelect,
    sampleItem,
    groups,
}: Omit<SearchResultsProps, "searchValue">) {
    const game = useGameTag() as GameNoUma;

    return !isPending ? (
        <Stack spacing={1}>
            {CUSTOM_ITEMS_ENABLED_GAMES.has(game) && (
                <AddCustomCard
                    label={categoryLabel}
                    handleSelect={handleSelect}
                    sampleItem={sampleItem}
                    groups={groups}
                    type={type}
                />
            )}
            {hits.map((item) => (
                <ButtonBase
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    sx={{ display: "inline" }}
                >
                    <SearchResultCard item={item} type={type} />
                </ButtonBase>
            ))}
        </Stack>
    ) : (
        <Loader />
    );
}

function NoHits({
    searchValue,
    isPending,
}: Pick<SearchResultsProps, "searchValue" | "isPending">) {
    if (!searchValue || isPending) return null;

    return (
        <Text sx={{ textAlign: "center", pt: 2 }}>
            {`No results for "`}
            <Text component="span" weight="highlight">
                {searchValue}
            </Text>
            {`"`}
            <br />
            <br />
            {`The item you are looking for may have already been selected.`}
        </Text>
    );
}

function CardRoot({ children }: { children?: React.ReactNode }) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 1,
                backgroundColor: theme.background(0),
                "&:hover": {
                    backgroundColor: theme.background(0, "light"),
                    cursor: "pointer",
                },
            }}
        >
            {children}
        </Card>
    );
}

function SearchResultCard({
    item,
    type,
}: {
    item: PlannerItemData;
    type: PlannerType;
}) {
    return (
        <CardRoot>
            <PlannerCardHeader item={item} type={type} />
        </CardRoot>
    );
}

function AddCustomCard({
    sampleItem,
    label,
    handleSelect,
    groups,
    type,
}: {
    sampleItem: PlannerItemData;
    label: string;
    handleSelect: (option: PlannerItemData | null) => void;
    groups: FilterGroup[];
    type: PlannerType;
}) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CardRoot>
                <ButtonBase
                    disableRipple
                    disableTouchRipple
                    onClick={handleOpen}
                    sx={{
                        display: "inline",
                        width: "100%",
                    }}
                >
                    <FlexBox spacing={2}>
                        <AutoAwesomeIcon
                            sx={{
                                width: "48px",
                                height: "48px",
                                p: "8px",
                                color: theme.text.primary,
                            }}
                        />
                        <Text weight="highlight">{`Add custom ${label}`}</Text>
                    </FlexBox>
                </ButtonBase>
            </CardRoot>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                // Prevent close on pressing `esc` or clicking backdrop
                onClose={() => {}}
                header={`Add custom ${label}`}
                actions={<></>}
                maxWidth="sm"
                contentProps={{ padding: 0 }}
            >
                <AddCustomContent
                    label={label}
                    handleClose={handleClose}
                    handleSelect={handleSelect}
                    sampleItem={sampleItem}
                    groups={groups}
                    type={type}
                />
            </ContentDialog>
        </>
    );
}

function createCustomItem(groups: FilterGroup[]): Item {
    const item: Item = {
        custom: true,
        id: 999999990,
        name: "",
        displayName: "",
        rarity: 0,
        materials: {},
        customMaterials: {},
        values: {},
        release: {
            version: "",
        },
    };

    for (const group of groups) {
        item[group.tag] = null;
    }

    return item;
}

function AddCustomContent({
    label,
    sampleItem,
    handleSelect,
    handleClose,
    groups,
    type,
}: {
    label: string;
    sampleItem: PlannerItemData;
    handleClose: () => void;
    handleSelect: (option: PlannerItemData | null) => void;
    groups: FilterGroup[];
    type: PlannerType;
}) {
    const game = useGameTag() as GameNoUma;

    const theme = useTheme();

    const store = usePlannerStore();
    const items = store[`${game}/items`];

    const customItemCount = items.filter((item) => item.custom).length;

    const [inputValue, setInputValue] = useState(
        `Custom ${label} #${customItemCount + 1}`,
    );
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setInputValue(event.target.value);
    };

    const [item, setItem] = useState<Item>(() => createCustomItem(groups));

    const groupKeys = groups.map((group) => group.tag);
    const materialKeys = objectKeys(sampleItem.materials);

    const materialGroups = useFilterGroups(game, {
        key: `${game}/${type}` as FilterKey,
    });

    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        handleSelect({
            ...item,
            id: item.id + customItemCount,
            name: inputValue,
            displayName: inputValue,
        } as PlannerItemData);
    };

    useEffect(() => {
        setValid(
            ((item: Item) => {
                for (const key of groupKeys) {
                    if (!item[key]) {
                        return false;
                    }
                }
                for (const key of materialKeys) {
                    if (!item.materials[key]) {
                        return false;
                    }
                }
                return true;
            })(item),
        );
    }, [item]);

    return (
        <Stack
            spacing={2}
            sx={{ p: 2, backgroundColor: theme.background(1, "light") }}
            divider={<Divider />}
        >
            <Stack spacing={2}>
                <SearchBar
                    placeholder={`Name`}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                        }
                    }}
                    inputIcon={<></>}
                    height="32px"
                />
                <Stack>
                    {groups.map((filter) => (
                        <AddCustomAttribute
                            key={filter.tag}
                            item={item}
                            setItem={setItem}
                            filter={filter}
                        />
                    ))}
                </Stack>
                {materialKeys.map((key) => (
                    <AddCustomMaterial
                        key={key}
                        materials={
                            materialGroups[formatMaterialKey(key.toString())]
                        }
                        materialKey={key.toString()}
                        setItem={setItem}
                    />
                ))}
            </Stack>
            <FlexBox spacing={[1, 2]} wrap sx={{ justifyContent: "right" }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                    disableRipple
                    sx={{ p: "4px 16px" }}
                >
                    <Text variant="body2" weight="highlight">
                        Cancel
                    </Text>
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disableRipple
                    sx={{
                        p: "4px 16px",
                        "&.Mui-disabled": {
                            backgroundColor: theme.palette.success.main,
                            color: theme.text.primary,
                            opacity: 0.5,
                            cursor: "not-allowed",
                        },
                    }}
                    disabled={!valid}
                >
                    <Text variant="body2" weight="highlight">
                        Add
                    </Text>
                </Button>
            </FlexBox>
        </Stack>
    );
}

function AddCustomAttribute({
    item,
    filter,
    setItem,
}: {
    item: Item;
    filter: FilterGroup;
    setItem: Dispatch<SetStateAction<Item>>;
}) {
    const handleAttributeSelect = (
        _: React.BaseSyntheticEvent,
        value: string | number,
    ) => {
        setItem((current) => ({
            ...current,
            [`${filter.tag}`]: value,
        }));
    };

    return (
        <FlexBox key={filter.tag} spacing={1}>
            <Text variant="subtitle1" weight="highlight" sx={{ width: "72px" }}>
                {filter.name}
            </Text>
            <ToggleButtons
                buttons={filter.buttons}
                value={item[filter.tag]}
                spacing={4}
                padding={filter.padding ?? 0}
                width={filter.width}
                exclusive
                onChange={handleAttributeSelect}
            />
        </FlexBox>
    );
}

type MaterialValue = MaterialRow | string | null;

interface MaterialRow {
    groupKey?: string | undefined;
    icon: React.ReactNode;
    title: string | number;
    value: string | number;
    inputValue?: string;
}

function AddCustomMaterial({
    materials,
    materialKey,
    setItem,
}: {
    materials: FilterGroup;
    materialKey: string;
    setItem: Dispatch<SetStateAction<Item>>;
}) {
    const buttons = materials.groupButtons || materials.buttons;
    const options: MaterialRow[] = buttons
        .map((button) => {
            if ("buttons" in button) {
                return button.buttons.map((option) => getOption(option));
            } else {
                return getOption(button);
            }
        })
        .flat();

    const [value, setValue] = useState<MaterialValue | null>(null);

    const BannerListbox = createVirtualizedListbox<MaterialRow>({
        listboxPadding: 0,
        renderRow: CustomMaterialRow,
    });

    const { listRef, handleItemsBuilt, handleHighlightChange } =
        useVirtualizedAutocomplete<MaterialRow>();

    const addCustomMaterial = (name: string) => {
        const id = `custom-${crypto.randomUUID()}`;

        setValue(name);

        setItem((current) => ({
            ...current,
            materials: {
                ...current.materials,
                [materialKey]: id,
            },
            customMaterials: {
                ...current.customMaterials,
                [id]: {
                    name,
                    rarities: materials.customMaterial?.rarities,
                },
            },
        }));
    };

    return (
        <Autocomplete
            freeSolo
            autoComplete
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) =>
                typeof option === "string" ? option : `${option.title}`
            }
            filterOptions={(options, params) => {
                const { inputValue } = params;
                const filtered = filterOptions(options, inputValue);

                // Suggest the creation of a new value
                const isExisting = options.some(
                    (option) => inputValue === option.title,
                );
                if (inputValue !== "" && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                        icon: "",
                        value: inputValue,
                    });
                }

                return filtered;
            }}
            value={value}
            isOptionEqualToValue={(option, value) =>
                typeof value !== "string" && option.icon === value.icon
            }
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    inputIcon={<></>}
                    placeholder={materials.name}
                />
            )}
            renderOption={(props, option) => [props, option] as React.ReactNode}
            onHighlightChange={handleHighlightChange}
            onChange={(_, newValue) => {
                if (typeof newValue === "string") {
                    addCustomMaterial(newValue);
                    return;
                }

                if (newValue?.inputValue) {
                    addCustomMaterial(newValue.inputValue);
                    return;
                }

                setValue(newValue);

                setItem((current) => ({
                    ...current,
                    materials: {
                        ...current.materials,
                        [materialKey]: newValue?.value,
                    },
                }));
            }}
            slots={{
                popper: VirtualizedAutocompletePopper,
            }}
            slotProps={{
                listbox: {
                    component: BannerListbox,
                    internalListRef: listRef,
                    onItemsBuilt: handleItemsBuilt,
                } as any,
            }}
            sx={(theme) => ({
                "& .MuiAutocomplete-inputRoot": {
                    backgroundColor: theme.background(2),
                    borderRadius: theme.contentBox.border.radius,
                    p: 0,
                },
            })}
        />
    );
}

function CustomMaterialRow({
    option,
    optionProps,
    disabled,
    style,
}: VirtualizedRowProps<MaterialRow>) {
    const theme = useTheme();

    return (
        <MenuItem {...optionProps} disabled={disabled} sx={style}>
            <TextLabel
                icon={option.icon}
                iconProps={{
                    styles: {
                        border: `$1px solid ${theme.border.color.primary}`,
                    },
                }}
                title={option.title}
                titleProps={{
                    variant: "subtitle1",
                }}
            />
        </MenuItem>
    );
}

function filterOptions(options: MaterialRow[], searchValue: string) {
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["title", "value"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    }).sort((a, b) => sortBy(b.title.toString(), a.title.toString()));
}
