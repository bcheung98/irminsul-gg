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
import { useGameTag } from "@/context";
import { categoryImgURLs } from "@/data/categories";
import { useRarityColors } from "@/helpers/rarityColors";
import { filterOptions } from "./BannerArchive.utils";
import {
    formatCharacterTitle,
    formatSupportTitle,
} from "@/helpers/uma/formatTitle";

// Type imports
import { BannerArchiveSelectorProps } from "./BannerArchive.types";
import { BannerOption } from "@/types/banner";
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { Game } from "@/types";

export default function BannerArchiveSelector({
    options,
    values,
    setValues,
}: BannerArchiveSelectorProps) {
    const game = useGameTag();

    const handleChange = (
        _: React.BaseSyntheticEvent,
        newValue: BannerOption[] | null,
    ) => setValues(() => newValue as BannerOption[]);

    const BannerListbox = createVirtualizedListbox<BannerOption>({
        renderRow: BannerRow,
    });

    const { listRef, handleItemsBuilt, handleHighlightChange } =
        useVirtualizedAutocomplete<BannerOption>();

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) => getOptionLabel(option, game)}
            filterOptions={(options, { inputValue }) =>
                filterOptions(options, inputValue)
            }
            value={values}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <SearchBar params={params} inputIcon={<></>} />
            )}
            renderOption={(props, option) => [props, option] as React.ReactNode}
            onHighlightChange={handleHighlightChange}
            onChange={handleChange}
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

function BannerRow({
    option,
    optionProps,
    disabled,
    style,
}: VirtualizedRowProps<BannerOption>) {
    const theme = useTheme();

    const game = useGameTag();
    const rarityColors = useRarityColors()[game];

    const title = getOptionLabel(option, game);

    let rarity = option.rarity;
    let border = "2px";

    if (game === "uma") {
        rarity += 2;
        if (option.category === "weapons") {
            border = "0px";
        }
    }

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
                icon={categoryImgURLs[`${game}/${option.category}`](option.id)}
                iconProps={{
                    size: 32,
                    styles: {
                        border: `${border} solid ${rarityColors(rarity)}`,
                    },
                }}
                title={title}
                titleProps={{
                    variant: "subtitle1",
                }}
            />
        </MenuItem>
    );
}

function getOptionLabel(option: BannerOption, game: Game) {
    let title = option.displayName;
    if (game === "uma") {
        if (option.category === "characters") {
            title = formatCharacterTitle(option as UmaCharacter);
        }
        if (option.category === "weapons") {
            title = formatSupportTitle(option as UmaSupport);
        }
    }
    return title;
}
