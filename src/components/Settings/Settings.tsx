import { useState, useRef } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import SettingsList from "./SettingsList";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import {
    settingsRequireReload,
    useSettingsStore,
    type SettingsState,
} from "@/stores/useSettingsStore";

export default function Settings() {
    const theme = useTheme();

    const settingsOnOpen = useRef<SettingsState | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        settingsOnOpen.current = {
            ...useSettingsStore.getState(),
        };

        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        const settings = useSettingsStore.getState();

        if (
            settingsOnOpen.current &&
            settingsRequireReload(settingsOnOpen.current, settings)
        ) {
            window.location.reload();
            return;
        }

        settingsOnOpen.current = null;
        setAnchorEl(null);
    };

    return (
        <>
            <NavButton
                onClick={handleMenuOpen}
                title="Settings"
                sx={{
                    p: 0.5,
                    color: open
                        ? theme.text.selected
                        : theme.appbar.color.primary,
                }}
            >
                <SettingsIcon />
            </NavButton>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
            >
                <Card
                    sx={{
                        width: { xs: "90vw", sm: "400px" },
                        p: 2,
                        backgroundColor: theme.background(2, "light"),
                        border: `1px solid ${theme.border.color.primary}`,
                    }}
                >
                    <Stack spacing={2} divider={<Divider />}>
                        <Stack spacing={2}>
                            <Text weight="highlight">Settings</Text>
                            <SettingsList />
                        </Stack>
                    </Stack>
                </Card>
            </Popover>
        </>
    );
}
