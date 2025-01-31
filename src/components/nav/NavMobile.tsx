import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Image from "custom/Image";
import Logo from "./Logo";
import KofiButton from "components/nav/KofiButton";
import RouterLink from "./RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    Box,
    Stack,
    IconButton,
    Collapse,
    MenuList,
    ListItem,
    ButtonBase,
    ClickAwayListener,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { NavProps, navStyles } from "./Nav";

function NavMobile({ navItems, linkItems }: NavProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuState = () => {
        setMenuOpen(!menuOpen);
    };
    const handleMenuClose = () => {
        setMenuOpen(false);
    };
    const handleMenuKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <ClickAwayListener onClickAway={handleMenuClose}>
            <AppBar
                position="fixed"
                onKeyDown={handleMenuKeyDown}
                sx={{ containerType: "inline-size" }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box>
                        <Logo href="/" size={matches_up_sm ? "48px" : "40px"} />
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <KofiButton />
                        <IconButton
                            onClick={toggleMenuState}
                            disableRipple
                            disableTouchRipple
                            sx={{
                                color: theme.appbar.color,
                                borderRadius: "8px",
                                px: "2px",
                                width: "36px",
                                height: "36px",
                                "&:hover": {
                                    backgroundColor: theme.appbar.hover,
                                },
                            }}
                        >
                            {!menuOpen ? <MenuIcon /> : <CloseIcon />}
                        </IconButton>
                    </Stack>
                </Toolbar>
                <Collapse
                    in={menuOpen}
                    timeout="auto"
                    sx={{
                        borderTop: `1px solid ${theme.appbar.hover}`,
                    }}
                >
                    <MenuList
                        sx={{
                            p: 2,
                            maxHeight: "100vh",
                            overflowY: "auto",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <ListItem>
                            <Box
                                onClick={toggleDropdownState}
                                sx={{ width: "100%" }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <TextStyled>Games</TextStyled>
                                    <IconButton
                                        disableRipple
                                        disableTouchRipple
                                        sx={{
                                            color: theme.appbar.color,
                                            p: 0,
                                        }}
                                    >
                                        <ExpandMoreIcon
                                            sx={{
                                                color: theme.border.color
                                                    .primary,
                                                transform: dropdownOpen
                                                    ? "rotateZ(-180deg)"
                                                    : "rotateZ(0deg)",
                                                transition: "transform 0.25s",
                                            }}
                                        />
                                    </IconButton>
                                </Stack>
                                <Collapse in={dropdownOpen} timeout="auto">
                                    <Stack
                                        spacing={1}
                                        sx={{
                                            mt: "16px",
                                            borderLeft: `1px solid ${theme.border.color.primary}`,
                                        }}
                                    >
                                        {linkItems.map((item, index) => (
                                            <Box
                                                key={index}
                                                sx={{ px: "16px" }}
                                            >
                                                <ButtonBase
                                                    href={item.link}
                                                    disableRipple
                                                    disableTouchRipple
                                                    sx={{
                                                        gap: "16px",
                                                        width: "100%",
                                                        justifyContent: "left",
                                                    }}
                                                >
                                                    {item.icon && (
                                                        <Image
                                                            src={item.icon}
                                                            alt={item.text}
                                                            style={{
                                                                width: "32px",
                                                                borderRadius:
                                                                    "4px",
                                                            }}
                                                        />
                                                    )}
                                                    <TextStyled
                                                        sx={styles.navItem()}
                                                    >
                                                        {item.text}
                                                    </TextStyled>
                                                </ButtonBase>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Collapse>
                            </Box>
                        </ListItem>
                        {navItems.map((item, index) => (
                            <ListItem key={index}>
                                <RouterLink
                                    to={item.link}
                                    onClick={toggleMenuState}
                                >
                                    <TextStyled sx={styles.navItem(item.link)}>
                                        {item.text}
                                    </TextStyled>
                                </RouterLink>
                            </ListItem>
                        ))}
                    </MenuList>
                </Collapse>
            </AppBar>
        </ClickAwayListener>
    );
}

export default NavMobile;
