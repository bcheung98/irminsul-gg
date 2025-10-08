"use client";

import { usePathname } from "next/navigation";

// Component imports
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import { Drawer } from "./DrawerRoot";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { navItems } from "../NavDrawer/navItems";
import Box from "@mui/material/Box";

export default function NavDrawer({ open }: { open: boolean }) {
    const theme = useTheme();

    const pathname = usePathname();
    const game = pathname.split("/")[1];

    const items = navItems[game] || [];

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                boxSizing: "content-box",
                "& .MuiDrawer-paper": {
                    borderRight: open
                        ? `1px solid ${theme.border.color.primary}`
                        : "none",
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
                                title={item.title}
                                titleProps={{
                                    color: theme.drawer.color.primary,
                                    defaultCursor: "pointer",
                                }}
                                spacing={2}
                            />
                        </Box>
                    </ButtonBase>
                ))}
            </Stack>
        </Drawer>
    );
}
