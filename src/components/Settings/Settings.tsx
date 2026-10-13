import { useState, useRef } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import ContentBox from "@/components/ContentBox";
import SettingsList from "./SettingsList";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import {
    settingsRequireReload,
    useSettingsStore,
    type SettingsState,
} from "@/stores/useSettingsStore";

export default function Settings() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);

    const settings = useSettingsStore((state) => state);

    const settingsOnOpen = useRef<SettingsState | null>(null);

    const toggleDrawer = (newOpen: boolean) => () => {
        if (newOpen) {
            settingsOnOpen.current = { ...settings };
        } else if (
            settingsOnOpen.current &&
            settingsRequireReload(settingsOnOpen.current, settings)
        ) {
            window.location.reload();
            return;
        }

        setOpen(newOpen);
    };

    return (
        <>
            <NavButton
                onClick={toggleDrawer(!open)}
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
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor="right"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    boxSizing: "content-box",
                    "& .MuiDrawer-paper": {
                        backgroundColor: theme.drawer.backgroundColor.main,
                    },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100vw", sm: "500px" },
                        height: "100vh",
                    }}
                >
                    <ContentBox
                        header="Settings"
                        actions={
                            <CloseButton
                                onClick={toggleDrawer(false)}
                                hoverColor={theme.drawer.backgroundColor.hover}
                            />
                        }
                        elevation={0}
                        headerProps={{
                            textVariant: "body1",
                            padding: matches ? "4px 24px" : "4px 16px",
                            dense: true,
                        }}
                    >
                        <SettingsList />
                    </ContentBox>
                </Box>
            </Drawer>
        </>
    );
}
