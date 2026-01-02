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
import { useGalleryStore } from "@/stores";

export default function FilterSort() {
    const theme = useTheme();

    const key = usePathname().slice(1) as keyof typeof sortOptions;

    const { setGalleryState } = useGalleryStore();
    const { sortBy, sortDirection, view } = useGalleryStore(
        useShallow((state) => state[key])
    );

    const handleSelectChange = (event: SelectChangeEvent) => {
        setGalleryState(key, "sortBy", event.target.value);
    };

    const handleDirectionChange = (_: React.BaseSyntheticEvent) => {
        if (sortDirection === "asc") {
            setGalleryState(key, "sortDirection", "desc");
        } else {
            setGalleryState(key, "sortDirection", "asc");
        }
    };

    let options = sortOptions[key];
    if (key === "genshin/tcg") {
        if (view === "icon") {
            options = [
                { value: "tcg-version", label: "Release Date" },
                { value: "name", label: "Name" },
                { value: "id", label: "Element" },
            ];
        } else {
            options = [
                { value: "tcg-version", label: "Release Date" },
                { value: "name", label: "Name" },
                { value: "id", label: "Card Type" },
            ];
        }
    }

    return (
        <Stack
            spacing={2}
            sx={{
                display: view !== "list" ? "block" : "none",
                borderTop: `1px solid ${theme.border.color.primary}`,
                pt: 2,
            }}
        >
            <Text sx={{ fontWeight: theme.font.weight.highlight }}>
                Sort By
            </Text>
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
                    {options.map(({ value, label }) => (
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

const sortOptions = {
    "genshin/characters": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "element", label: "Element" },
        { value: "weaponType", label: "Weapon" },
    ],
    "genshin/weapons": [
        { value: "version", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "weaponType", label: "Weapon" },
    ],
    "genshin/tcg": [
        { value: "id", label: "Default" },
        { value: "tcg-version", label: "Release Date" },
    ],
    "hsr/characters": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "element", label: "Combat Type" },
        { value: "weaponType", label: "Path" },
    ],
    "hsr/lightcones": [
        { value: "version", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "weaponType", label: "Path" },
    ],
    "wuwa/resonators": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "element", label: "Attribute" },
        { value: "weaponType", label: "Weapon" },
    ],
    "wuwa/weapons": [
        { value: "version", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "weaponType", label: "Weapon" },
    ],
    "wuwa/echoes": [
        { value: "version", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Class" },
    ],
    "zzz/agents": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rank" },
        { value: "element", label: "Attribute" },
        { value: "weaponType", label: "Specialty" },
    ],
    "zzz/w-engines": [
        { value: "version", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rank" },
        { value: "weaponType", label: "Specialty" },
    ],
    "uma/characters": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
    ],
    "uma/supports": [
        { value: "release", label: "Release Date" },
        { value: "name", label: "Name" },
        { value: "rarity", label: "Rarity" },
        { value: "specialty", label: "Specialty" },
    ],
    "uma/skills": [
        { value: "skillName", label: "Name" },
        { value: "skillRarity", label: "Rarity" },
        { value: "skillType", label: "Type" },
    ],
};
