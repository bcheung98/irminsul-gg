import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Image from "custom/Image";
import Logo from "./Logo";
import KofiButton from "components/nav/KofiButton";
import RouterLink from "./RouterLink";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    alpha,
    AppBar,
    Toolbar,
    Box,
    useScrollTrigger,
    Fade,
    getContrastRatio,
    Button,
    Menu,
    MenuItem,
    ButtonBase,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Helper imports
import { NavProps, navStyles } from "./Nav";

function NavDesktop({ navItems, linkItems }: NavProps) {
    const theme = useTheme();

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: alpha(theme.appbar.backgroundColor, 0.88),
                backdropFilter: "blur(8px)",
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    pr: "32px",
                    justifyContent: "space-between",
                }}
            >
                <FlexBox columnGap="48px">
                    <FlexBox>
                        <Box
                            sx={{
                                width: "64px",
                            }}
                        />
                        <Logo />
                    </FlexBox>
                    <FlexBox columnGap="8px">
                        <Button
                            disableRipple
                            disableTouchRipple
                            onClick={handleMenuOpen}
                            variant="text"
                            sx={styles.navItem()}
                            endIcon={
                                <KeyboardArrowDownIcon
                                    sx={{
                                        transform: open
                                            ? "rotateZ(-180deg)"
                                            : "rotateZ(0deg)",
                                        transition: "transform 0.25s",
                                    }}
                                />
                            }
                        >
                            <TextStyled
                                variant="subtitle1-styled"
                                sx={{ color: "inherit" }}
                            >
                                Games
                            </TextStyled>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            disableScrollLock
                            sx={{
                                "& .MuiMenu-paper": {
                                    border: `1px solid ${theme.appbar.hover}`,
                                    borderRadius: "16px",
                                },
                                "& .MuiMenu-list": {
                                    backgroundColor: theme.background(
                                        2,
                                        "light"
                                    ),
                                },
                            }}
                        >
                            {linkItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    disableRipple
                                    sx={styles.listItem()}
                                >
                                    <ButtonBase
                                        href={item.link}
                                        disableRipple
                                        disableTouchRipple
                                        sx={{ gap: "16px" }}
                                    >
                                        {item.icon && (
                                            <Image
                                                src={item.icon}
                                                alt={item.text}
                                                style={{
                                                    width: "32px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        )}
                                        <TextStyled
                                            variant="subtitle1-styled"
                                            sx={{ color: "inherit" }}
                                        >
                                            {item.text}
                                        </TextStyled>
                                    </ButtonBase>
                                </MenuItem>
                            ))}
                        </Menu>
                        {navItems.map((item, index) => (
                            <RouterLink key={index} to={item.link}>
                                <Button
                                    variant="text"
                                    disableRipple
                                    disableTouchRipple
                                    sx={styles.navItem(item.link)}
                                >
                                    <TextStyled
                                        variant="subtitle1-styled"
                                        sx={{ color: "inherit" }}
                                    >
                                        {item.text}
                                    </TextStyled>
                                </Button>
                            </RouterLink>
                        ))}
                    </FlexBox>
                </FlexBox>
                <FlexBox columnGap="32px">
                    <ScrollTopDesktop>
                        <Button
                            variant="contained"
                            startIcon={<KeyboardArrowUpIcon />}
                            sx={{
                                height: "32px",
                                backgroundColor: theme.palette.info.dark,
                                color:
                                    getContrastRatio(
                                        theme.palette.info.dark,
                                        theme.text.primary
                                    ) > 4.5
                                        ? theme.text.primary
                                        : theme.text.contrast,
                            }}
                        >
                            Back to Top
                        </Button>
                    </ScrollTopDesktop>
                    <KofiButton />
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}

export default NavDesktop;

function ScrollTopDesktop({ children }: { children: React.ReactNode }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick}>{children}</Box>
        </Fade>
    );
}
