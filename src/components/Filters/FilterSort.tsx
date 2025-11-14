import { BaseSyntheticEvent } from "react";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

// Component imports
import Text from "@/components/Text";
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// Helper imports
import { GalleryState, useGalleryStore } from "@/stores/useGalleryStore";

export default function FilterSort() {
    const theme = useTheme();

    const key = usePathname().slice(1) as keyof GalleryState;

    const { setGalleryState } = useGalleryStore();
    const { sortBy, sortDirection } = useGalleryStore(
        useShallow((state) => state[key])
    );

    const handleSelectChange = (event: SelectChangeEvent) => {
        setGalleryState(key, "sortBy", event.target.value);
    };

    const handleDirectionChange = (_: BaseSyntheticEvent) => {
        if (sortDirection === "asc") {
            setGalleryState(key, "sortDirection", "desc");
        } else {
            setGalleryState(key, "sortDirection", "asc");
        }
    };

    return (
        <Stack spacing={2}>
            <Text>Sort By</Text>
            <Stack spacing={1} direction="row" alignItems="center">
                <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSelectChange}
                    input={<SelectInput />}
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                    sx={{ width: "min-content", minWidth: "100px" }}
                >
                    {options[key].map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            <Text variant="subtitle1">{label}</Text>
                        </MenuItem>
                    ))}
                </Select>
                <IconButton
                    onClick={handleDirectionChange}
                    sx={{
                        backgroundColor: theme.background(0, "dark"),
                        border: `1px solid ${theme.border.color.primary}`,
                        borderRadius: "4px",
                        width: "32px",
                        height: "32px",
                        "&:hover": {
                            backgroundColor: theme.background(0, "light"),
                        },
                    }}
                >
                    <KeyboardDoubleArrowUpIcon
                        fontSize="small"
                        sx={{
                            transform:
                                sortDirection === "asc"
                                    ? "rotateX(0deg)"
                                    : "rotateX(180deg)",
                            transition: "transform 0.25s",
                        }}
                    />
                </IconButton>
            </Stack>
        </Stack>
    );
}

const options = {
    "genshin/characters": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "element", label: "Element" },
        { value: "weaponType", label: "Weapon" },
    ],
    "genshin/weapons": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "weaponType", label: "Weapon" },
    ],
};
