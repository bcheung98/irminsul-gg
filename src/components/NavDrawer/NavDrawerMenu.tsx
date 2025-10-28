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

    const textStyles = (href: string) => {
        return pathname.includes(`/${game}/${href}`)
            ? {
                  color: theme.text.selected,
                  textShadow: `${theme.text.selected} 1px 1px 16px`,
              }
            : { color: theme.drawer.color.primary, textShadow: "none" };
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
                                    p: { xs: "4px 16px", sm: "4px 24px" },
                                    borderRadius: { xs: "4px", lg: 0 },
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
