// Component imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

// MUI imports
import { useTheme, useMediaQuery, SxProps, Theme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function Nav() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    let linkItems: NavItem[] = [];
    websites.forEach(
        (site) =>
            site.enabled &&
            linkItems.push({
                icon: `https://assets.irminsul.gg/main/game-icons/${site.tag}.png`,
                text: site.title,
                link: `https://${site.tag.toLowerCase()}.irminsul.gg/`,
            })
    );
    linkItems = linkItems.sort((a, b) => a.text.localeCompare(b.text));

    return (
        <>
            {matches_up_md ? (
                <NavDesktop navItems={navItems} linkItems={linkItems} />
            ) : (
                <NavMobile navItems={navItems} linkItems={linkItems} />
            )}
        </>
    );
}

export default Nav;

export interface NavProps {
    navItems: NavItem[];
    linkItems: NavItem[];
}

export interface NavItem {
    icon?: string;
    text: string;
    link: string;
}

const navItems: NavItem[] = [
    {
        text: "Calendar",
        link: "/calendar",
    },
    {
        text: "Blog",
        link: "/blog",
    },
];

export const navStyles = (location: string) => ({
    navItem:
        (link = ""): SxProps<Theme> =>
        (theme) => ({
            color: link === location ? theme.text.selected : theme.appbar.color,
            textShadow:
                link === location
                    ? `${theme.text.selected} 1px 1px 16px`
                    : "none",
            transition: "color 0.25s",
            "&:hover": {
                color: theme.text.selected,
                textShadow: `${theme.text.selected} 1px 1px 8px`,
            },
        }),
    listItem: (): SxProps<Theme> => (theme) => ({
        "&.MuiMenuItem-root": {
            color: theme.text.primary,
            "&:hover": {
                backgroundColor: theme.menu.hover,
                color: theme.text.selected,
                textShadow: `${theme.text.selected} 1px 1px 8px`,
            },
            "&.Mui-focusVisible, &.Mui-selected": {
                backgroundColor: theme.menu.hover,
                color: theme.text.selected,
                textShadow: `${theme.text.selected} 1px 1px 8px`,
                "&:hover": {
                    backgroundColor: theme.menu.hover,
                },
            },
        },
    }),
});
