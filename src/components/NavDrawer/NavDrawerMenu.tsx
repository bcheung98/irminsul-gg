import { usePathname } from "next/navigation";

// Component imports
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useGameTag } from "@/context";
import { NavItem } from "@/data/navItems";

interface NavDrawerMenuProps {
    open?: boolean;
    items: NavItem[];
}

export default function NavDrawerMenu({ open, items }: NavDrawerMenuProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const pathname = usePathname();
    const game = useGameTag();

    function isLinkActive<T>(href: string, active: T, inactive: T) {
        if (!href) return pathname === `/${game}` ? active : inactive;
        else return pathname.includes(`/${game}/${href}`) ? active : inactive;
    }

    const textStyles = (href: string) => {
        const selected = {
            color: theme.text.selected,
            textShadow: `${theme.text.selected} 1px 1px 16px`,
        };
        const unselected = {
            color: theme.drawer.color.primary,
            textShadow: "none",
        };
        return isLinkActive(href, selected, unselected);
    };

    const borderColor = (href: string) => {
        const selected = theme.text.selected;
        const unselected = "transparent";
        return isLinkActive(href, selected, unselected);
    };

    const backgroundColor = (href: string) => {
        const selected = theme.drawer.backgroundColor.hover;
        const unselected = "transparent";
        return isLinkActive(href, selected, unselected);
    };

    return (
        <Grid
            container
            className="nav-mobile"
            spacing={1}
            sx={{ p: { xs: 1, lg: 0 } }}
        >
            {items.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 3, lg: 12 }}>
                    <ButtonBase
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
                                    p: {
                                        xs: "4px 16px",
                                        lg: "4px 24px 4px 20px",
                                    },
                                    borderRadius: {
                                        xs: "4px",
                                        lg: "4px 0 0 4px",
                                    },
                                    borderLeft: {
                                        xs: 0,
                                        lg: `4px solid ${borderColor(
                                            item.href
                                        )}`,
                                    },
                                    backgroundColor: backgroundColor(item.href),
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor.hover,
                                    },
                                    transition:
                                        "border-left 0.25s, background-color 0.25s",
                                }}
                            >
                                <TextLabel
                                    icon={`${game}/${item.icon}`}
                                    iconProps={{ size: 28 }}
                                    title={open ? item.title : ""}
                                    titleProps={{
                                        sx: textStyles(item.href),
                                        variant: matches
                                            ? "subtitle1"
                                            : "subtitle2",
                                    }}
                                    spacing={2}
                                />
                            </Box>
                        </Tooltip>
                    </ButtonBase>
                </Grid>
            ))}
        </Grid>
    );
}
