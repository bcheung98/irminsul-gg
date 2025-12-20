import { useState } from "react";

// Component imports
import GamesMenuList from "./GamesMenuList";
import NavButton from "@/components/NavButton";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
            <Button
                onClick={handleMenuOpen}
                variant="text"
                endIcon={
                    <KeyboardArrowDownIcon
                        fontSize="small"
                        sx={{
                            transform: open
                                ? "rotateZ(-180deg)"
                                : "rotateZ(0deg)",
                            transition: "transform 0.25s",
                        }}
                    />
                }
                sx={[
                    {
                        display: { xs: "none", md: "flex" },
                        transition: "color 0.25s",
                        "&:hover": {
                            color: theme.text.selected,
                            textShadow: ` ${theme.text.selected} 1px 1px 8px`,
                        },
                    },
                    open && {
                        color: theme.text.selected,
                        textShadow: ` ${theme.text.selected} 1px 1px 8px`,
                    },
                ]}
            >
                <Text
                    variant="body2"
                    sx={{
                        fontWeight: theme.font.weight.highlight,
                        color: "inherit",
                    }}
                >
                    Games
                </Text>
            </Button>
            <NavButton
                onClick={handleMenuOpen}
                title="Games"
                sx={{
                    display: { xs: "flex", md: "none" },
                    backgroundColor: open
                        ? theme.appbar.backgroundColor.selectedHover
                        : "transparent",
                }}
            >
                <AppsIcon />
            </NavButton>
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
