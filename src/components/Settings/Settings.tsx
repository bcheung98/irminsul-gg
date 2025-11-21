import { useEffect, useState, useRef } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import ContentBox from "@/components/ContentBox";
import SettingsList from "./SettingsList";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import { useStore } from "@/hooks";
import { useSettingsStore } from "@/stores/useSettingsStore";

export default function Settings() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        if (
            !newOpen &&
            unreleasedContentOld.current !== settings?.hideUnreleasedContent
        ) {
            if (window) window.dispatchEvent(new Event("storage"));
        }
    };

    const settings = useStore(useSettingsStore, (state) => state);
    const unreleasedContentOld = useRef(settings?.hideUnreleasedContent);

    useEffect(() => {
        window.addEventListener("storage", (event) => {
            if (event.key === "v2/settings") {
                window.location.reload();
            }
        });
    }, [open]);

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
                <Box sx={{ width: { xs: "100vw", sm: "500px" } }}>
                    <ContentBox
                        header="Settings"
                        actions={
                            <CloseButton
                                onClick={() => setOpen(false)}
                                hoverColor={theme.drawer.backgroundColor.hover}
                            />
                        }
                        elevation={0}
                        headerProps={{
                            textVariant: "body1",
                            padding: "4px 24px",
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
