import { useState } from "react";

// Component imports
import GamesMenuList from "./GamesMenuList";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import AppsIcon from "@mui/icons-material/Apps";

export default function GamesMenu() {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Games" placement="right">
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                        px: 0,
                        color: open
                            ? theme.text.selected
                            : theme.appbar.color.primary,
                        "&:hover": {
                            color: theme.text.selected,
                        },
                    }}
                >
                    <AppsIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                    "& .MuiMenu-paper": {
                        border: `1px solid ${theme.appbar.backgroundColor.hover}`,
                        borderRadius: "8px",
                    },
                    "& .MuiMenu-list": {
                        backgroundColor: theme.background(2, "light"),
                    },
                }}
            >
                <GamesMenuList handleClose={handleMenuClose} />
            </Menu>
        </>
    );
}
