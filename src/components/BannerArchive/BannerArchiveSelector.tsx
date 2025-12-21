import { HTMLAttributes } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import SearchBar from "@/components/SearchBar";
import MenuItem from "@/components/MenuItem";

// MUI imports
import { SxProps, Theme } from "@mui/material/styles";
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
        newValue: BannerOption[] | null
    ) => setValues(() => newValue as BannerOption[]);

    const styles: SxProps<Theme> = (theme) => ({
        width: { xs: "100%", md: "75%", lg: "50%" },
        "& .MuiAutocomplete-inputRoot": {
            backgroundColor: theme.background(2),
            borderRadius: theme.contentBox.border.radius,
            p: 0,
        },
    });

    return (
        <Autocomplete
            sx={styles}
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
            onChange={handleChange}
            renderInput={(params) => (
                <SearchBar params={params} inputIcon={<></>} />
            )}
            renderOption={(params, option) => (
                <RenderOption key={option.id} params={params} option={option} />
            )}
        />
    );
}

function RenderOption({
    params,
    option,
}: {
    params: HTMLAttributes<HTMLLIElement>;
    option: BannerOption;
}) {
    const game = useGameTag();
    const rarityColors = useRarityColors()[game];

    let title = getOptionLabel(option, game);
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
            {...params}
            key={option.id}
            sx={(theme) => ({
                "&:hover": {
                    backgroundColor: theme.background(1, "light"),
                },
                "&:not(:last-child)": {
                    borderBottom: `1px solid ${theme.border.color.primary}`,
                },
            })}
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
