"use client";

// Component imports
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import Tooltip from "@/components/Tooltip";
import { Drawer } from "./DrawerRoot";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useGameTag } from "@/app/context";
import { navItems } from "@/data/navItems";

export default function NavDrawer({ open }: { open: boolean }) {
    const theme = useTheme();

    const game = useGameTag();

    const items = navItems[game] || [];

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                boxSizing: "content-box",
                "& .MuiDrawer-paper": {
                    borderRight: `1px solid ${theme.border.color.primary}`,
                    backgroundColor: theme.drawer.backgroundColor.main,
                },
            }}
        >
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            <Stack spacing={1} sx={{ py: "16px" }}>
                {items.map((item, index) => (
                    <ButtonBase
                        key={index}
                        href={`/${game}/${item.href}`}
                        LinkComponent={NavLink}
                    >
                        <Tooltip
                            title={!open ? item.title : ""}
                            arrow
                            placement="right"
                        >
                            <Box
                                sx={{
                                    p: "4px 24px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor.hover,
                                    },
                                }}
                            >
                                <TextLabel
                                    icon={`${game}/${item.icon}`}
                                    iconProps={{ size: 28 }}
                                    title={open ? item.title : ""}
                                    titleProps={{
                                        color: theme.drawer.color.primary,
                                        defaultCursor: "pointer",
                                    }}
                                    spacing={2}
                                />
                            </Box>
                        </Tooltip>
                    </ButtonBase>
                ))}
            </Stack>
        </Drawer>
    );
}
