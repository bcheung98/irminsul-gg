import { useState } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import ContentBox from "@/components/ContentBox";
import SettingsList from "./SettingsList";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Settings() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
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
                <Box sx={{ width: { xs: "100vw", sm: "500px" } }}>
                    <ContentBox
                        header="Settings"
                        actions={
                            <IconButton
                                onClick={() => setOpen(false)}
                                sx={{
                                    p: 0.5,
                                    color: theme.contentBox.color.header,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor.hover,
                                    },
                                }}
                                edge="end"
                            >
                                <CloseIcon />
                            </IconButton>
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
