import { usePathname } from "next/navigation";

// Component imports
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
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
        <Stack
            className="nav-mobile"
            spacing={1}
            sx={{ py: { xs: "8px", lg: "16px" } }}
        >
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
                                p: { xs: "4px 16px", sm: "4px 24px" },
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
                                    variant: matches ? "body1" : "body2",
                                }}
                                spacing={2}
                            />
                        </Box>
                    </Tooltip>
                </ButtonBase>
            ))}
        </Stack>
    );
}
