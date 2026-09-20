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
import { filterPlannerMaterialOptions } from "./PlannerCustomItem.utils";

// Type imports
import type { Item } from "@/types";
import type { FilterGroup } from "@/types/filters";
import type { MaterialRow, MaterialValue } from "./PlannerCustomItem.types";
import type {
    CustomMaterial,
    CustomMaterials,
} from "@/components/PlannerMaterials/PlannerMaterials.utils";
import type { MaterialCategory } from "@/types/materials";

export function AddCustomMaterial({
    materials,
    customMaterials,
    materialKey,
    setItem,
}: {
    materials: FilterGroup;
    customMaterials: CustomMaterials;
    materialKey: MaterialCategory;
    setItem: Dispatch<SetStateAction<Item>>;
}) {
    const buttons = materials.groupButtons || materials.buttons;

    const options: MaterialRow[] = [
        ...buttons.flatMap((button) =>
            "buttons" in button
                ? button.buttons.map(getOption)
                : [getOption(button)],
        ),
        ...Object.entries(customMaterials)
            .filter(([, material]) => material.materialKey === materialKey)
            .map(([id, material]) => ({
                title: material.name,
                icon: "__custom__",
                value: id,
                custom: true,
            })),
    ];

    const [value, setValue] = useState<MaterialValue | null>(null);

    const BannerListbox = createVirtualizedListbox<MaterialRow>({
        listboxPadding: 0,
        renderRow: CustomMaterialRow,
    });

    const { listRef, handleItemsBuilt, handleHighlightChange } =
        useVirtualizedAutocomplete<MaterialRow>();

    const selectMaterial = (
        current: Item,
        value: string | number | undefined,
        customMaterial?: CustomMaterial,
    ) => {
        const previous = current.materials[materialKey];
        const nextCustomMaterials = { ...current.customMaterials };

        if (typeof previous === "string" && previous.startsWith("custom-")) {
            delete nextCustomMaterials[previous];
        }
        if (
            typeof value === "string" &&
            value.startsWith("custom-") &&
            customMaterial
        ) {
            nextCustomMaterials[value] = customMaterial;
        }

        return {
            ...current,
            materials: {
                ...current.materials,
                [materialKey]: value,
            },
            customMaterials: nextCustomMaterials,
        };
    };

    const addCustomMaterial = (name: string) => {
        if (!materials.customMaterial) return;

        const id = `custom-${crypto.randomUUID()}`;

        const customMaterial: CustomMaterial = {
            name,
            materialKey,
            rarities: materials.customMaterial.rarities,
        };

        setValue(name);

        setItem((current) => selectMaterial(current, id, customMaterial));
    };

    return (
        <Autocomplete
            freeSolo
            autoComplete
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) =>
                typeof option === "string" ? option : `${option.title}`
            }
            filterOptions={(options, params) => {
                const { inputValue } = params;
                const filtered = filterPlannerMaterialOptions(
                    options,
                    inputValue,
                );

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
                typeof value !== "string" && option.value === value.value
            }
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    inputIcon={<></>}
                    placeholder="Select material"
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

                setItem((current) =>
                    selectMaterial(
                        current,
                        newValue?.value,
                        newValue?.custom && newValue.value
                            ? customMaterials[newValue.value]
                            : undefined,
                    ),
                );
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
            sx={{
                width: "100%",
                "& .MuiAutocomplete-inputRoot": {
                    p: 0,
                },
            }}
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
                    supressLoadImageWarning: option.custom,
                }}
                title={option.title}
                titleProps={{
                    variant: "subtitle1",
                }}
            />
        </MenuItem>
    );
}
