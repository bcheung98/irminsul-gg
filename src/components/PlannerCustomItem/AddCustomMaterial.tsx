import { Dispatch, SetStateAction, useState } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import SearchBar from "@/components/SearchBar";
import MenuItem from "@/components/MenuItem";
import {
    createVirtualizedListbox,
    useVirtualizedAutocomplete,
    VirtualizedAutocompletePopper,
    VirtualizedRowProps,
} from "@/components/VirtualizedAutocomplete";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";

// Helper imports
import { getOption } from "@/components/PlannerSelector/PlannerSelector.utils";
import { filterOptions } from "./PlannerCustomItem.utils";

// Type imports
import type { Item } from "@/types";
import type { FilterGroup } from "@/types/filters";
import type { MaterialRow, MaterialValue } from "./PlannerCustomItem.types";

export function AddCustomMaterial({
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
