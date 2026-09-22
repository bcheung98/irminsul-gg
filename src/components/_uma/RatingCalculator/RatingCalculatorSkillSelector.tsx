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
import { sortBy } from "@/utils";
import { useUmaContext } from "@/context";
import { matchSorter } from "match-sorter";

// Type imports
import { UmaSkillOption } from "@/types/uma/calculator";

export default function RatingCalculatorSkillSelector({
    character,
    options,
    values,
    placeholder = "Add Skill",
    handleChange,
}: {
    character: number | null;
    options: UmaSkillOption[];
    values: UmaSkillOption[];
    placeholder?: string;
    handleChange: (newValue: UmaSkillOption[] | null) => void;
}) {
    const theme = useTheme();

    const { skills } = useUmaContext();

    const SkillListbox = createVirtualizedListbox<UmaSkillOption>({
        desktopRowHeight: 36,
        renderRow: SkillRow,
    });

    const { listRef, handleItemsBuilt, handleHighlightChange } =
        useVirtualizedAutocomplete<UmaSkillOption>();

    const getOptionDisabled = (option: UmaSkillOption) => {
        const skill = skills.find((skill) => skill.id === option.id);
        // Prevent picking current selected character's Unique Skill
        if (character && skill && skill.unique) {
            if (skill.unique === character) return true;
        }
        return values.includes(option);
    };

    return (
        <Autocomplete
            fullWidth
            multiple
            autoComplete
            disableListWrap
            disableClearable
            filterSelectedOptions
            options={[...options.sort((a, b) => sortBy(b.id, a.id))]}
            getOptionLabel={(option) =>
                option.name || option.nameJP || option.nameJPNative
            }
            filterOptions={(options, { inputValue }) =>
                filterOptions(options, inputValue)
            }
            value={values}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionDisabled={getOptionDisabled}
            noOptionsText="No skills"
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    inputIcon={<></>}
                    placeholder={placeholder}
                    backgroundColor={theme.background(0)}
                />
            )}
            renderOption={(props, option) =>
                [props, option, getOptionDisabled(option)] as React.ReactNode
            }
            onHighlightChange={handleHighlightChange}
            onChange={(event, newValues, reason) => {
                let nextValues = newValues;
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
                // replace that skill with the newer version instead
                const option = nextValues.at(-1);
                if (option) {
                    const skill = skills.find(
                        (skill) => skill.id === option.id,
                    );
                    if (skill && skill.versions) {
                        skill.versions.forEach((id) => {
                            const index = values.findIndex(
                                (item) => item.id === id,
                            );
                            if (index !== -1)
                                nextValues.splice(index, 1, option);
                        });
                    }
                }
                handleChange(Array.from(new Set(nextValues)));
            }}
            slots={{
                popper: VirtualizedAutocompletePopper,
            }}
            slotProps={{
                listbox: {
                    component: SkillListbox,
                    internalListRef: listRef,
                    onItemsBuilt: handleItemsBuilt,
                } as any,
            }}
            renderValue={() => null}
            sx={(theme) => ({
                "& .MuiAutocomplete-inputRoot": {
                    borderRadius: theme.contentBox.border.radius,
                    p: 0,
                },
            })}
        />
    );
}

function SkillRow({
    option,
    optionProps,
    disabled,
    style,
}: VirtualizedRowProps<UmaSkillOption>) {
    const theme = useTheme();

    return (
        <MenuItem
            {...optionProps}
            disabled={disabled}
            sx={{
                ...style,
                "&.MuiMenuItem-root": {
                    "&:hover": {
                        backgroundColor: theme.menu.backgroundColor.primary,
                    },
                    "&.Mui-focused": {
                        backgroundColor: theme.menu.backgroundColor.hover,
                    },
                    "&.Mui-selected": {
                        backgroundColor: theme.palette.info.main,
                        "&:hover, &.Mui-focused": {
                            backgroundColor: theme.palette.info.light,
                        },
                    },
                },
            }}
        >
            <TextLabel
                title={option.name}
                icon={`uma/skills/${option.icon}`}
                titleProps={{ variant: "subtitle1", weight: "highlight" }}
                iconProps={{ size: 24 }}
            />
        </MenuItem>
    );
}

function filterOptions(options: UmaSkillOption[], searchValue: string) {
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["name"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    }).sort((a, b) => sortBy(b.icon, a.icon) || sortBy(b.name, a.name));
}
