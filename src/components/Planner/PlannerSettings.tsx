import { useState } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import SettingsItem from "@/components/Settings/SettingsItem";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ListIcon from "@mui/icons-material/List";

// Helper imports
import { useSettingsStore } from "@/stores";

// Type imports
import type { GalleryView } from "@/types";

const buttons = [
    {
        value: "card",
        icon: <ViewModuleIcon fontSize="small" />,
        tooltip: "Card",
    },
    {
        value: "list",
        icon: <ListIcon fontSize="small" />,
        tooltip: "List",
    },
];

export default function PlannerSettings() {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const view = useSettingsStore((state) => state.plannerMaterialView);
    const setView = useSettingsStore((state) => state.setPlannerMaterialView);

    const handleChange = (
        _: React.BaseSyntheticEvent,
        newValue: GalleryView | null,
    ) => {
        if (newValue) {
            setView(newValue);
        }
    };

    return (
        <>
            <NavButton
                onClick={handleMenuOpen}
                sx={{
                    p: 0.5,
                }}
            >
                <MoreVertIcon />
            </NavButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    "& .MuiMenu-paper": {
                        backgroundColor: theme.menu.backgroundColor.primary,
                        border: `1px solid ${theme.border.color.primary}`,
                        borderRadius: "4px",
                        width: { xs: "200px", sm: "256px" },
                        px: 1,
                    },
                }}
            >
                <SettingsItem
                    label="Material Display"
                    alignItems="center"
                    textVariant="body2"
                    input={
                        <ToggleButtons
                            buttons={buttons}
                            value={view}
                            exclusive
                            onChange={handleChange}
                            padding="4px"
                        />
                    }
                />
            </Menu>
        </>
    );
}
