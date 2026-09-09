import { useState } from "react";

// Component imports
import GamesMenuList from "./GamesMenuList";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Helper imports
import { useGame } from "@/context";

export default function GamesMenu() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGame();

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
                <TextLabel
                    title={!matches && game ? game.name : "Games"}
                    titleProps={{
                        variant: "body2",
                        sx: {
                            fontWeight: theme.font.weight.highlight,
                            color: "inherit",
                        },
                    }}
                    icon={
                        !matches &&
                        (game ? `${game.tag}/_common/Icon` : <AppsIcon />)
                    }
                    iconProps={{ size: 28 }}
                    spacing={2}
                />
            </Button>
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
