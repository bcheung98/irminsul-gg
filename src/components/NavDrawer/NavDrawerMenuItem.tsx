import { useState } from "react";
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

// Type imports
import { NavItem } from "@/data/navItems";

export default function NavDrawerMenuItem({
    open,
    item,
}: {
    open?: boolean;
    item: NavItem;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const pathname = usePathname();
    const game = useGameTag();

    const isLinkActive = !item.href
        ? pathname === `/${game}`
        : pathname.includes(`/${game}/${item.href}`);

    const [hover, setHover] = useState(false);

    const rootStyle = {
        position: "relative",
        p: {
            xs: "4px 16px",
            lg: "4px 24px",
        },
        borderRadius: {
            xs: "4px",
            lg: 0,
        },
        backgroundColor: isLinkActive
            ? theme.drawer.backgroundColor.hover
            : "transparent",
        transition: "background-color 0.25s",
        "&:hover": {
            backgroundColor: theme.drawer.backgroundColor.hover,
        },
    };

    const indicatorStyle = [
        {
            position: "absolute",
            top: 8,
            left: 0,
            width: "4px",
            height: "20px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "transparent",
            borderRadius: "0 16px 16px 0",
            transition: "border 0.25s",
        },
        hover &&
            !isLinkActive && {
                borderColor: theme.text.selected,
                borderRadius: "0 8px 8px 0",
            },
        isLinkActive && {
            top: 0,
            height: { xs: "30px", md: "36px" },
            borderColor: theme.text.selected,
            borderRadius: "0 8px 8px 0",
        },
    ];

    const titleStyle = {
        opacity: open ? 1 : 0,
        color: isLinkActive ? theme.text.selected : theme.drawer.color.primary,
        textShadow: isLinkActive ? `${theme.text.selected} 0 0 16px` : "none",
        transition: "opacity 0.25s, color 0.25s, box-shadow 0.25s",
    };

    return (
        <Grid
            size={{ xs: 12, sm: 3, lg: 12 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <ButtonBase href={`/${game}/${item.href}`} LinkComponent={NavLink}>
                <Tooltip
                    title={!open ? item.title : ""}
                    arrow
                    placement="right"
                >
                    <Box sx={rootStyle}>
                        <Box sx={indicatorStyle} />
                        <TextLabel
                            icon={`${game}/${item.icon}`}
                            iconProps={{
                                size: 28,
                                styles: {
                                    opacity: matches ? 1 : open ? 1 : 0,
                                    transition: "opacity 0.25s",
                                },
                            }}
                            title={item.title}
                            titleProps={{
                                variant: matches ? "subtitle1" : "subtitle2",
                                sx: titleStyle,
                            }}
                            spacing={2}
                        />
                    </Box>
                </Tooltip>
            </ButtonBase>
        </Grid>
    );
}
