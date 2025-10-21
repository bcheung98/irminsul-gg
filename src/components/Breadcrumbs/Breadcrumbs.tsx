import { useContext } from "react";

// Component imports
import NavLink from "@/components/NavLink/";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Helper imports
import { navItems } from "../NavDrawer/navItems";
import { convertNametoURL } from "@/utils";
import { DataContext } from "@/app/context";

// Type imports
import { Website } from "@/types/website";

export default function Breadcrumbs({
    website,
    pathname,
}: {
    website: Website;
    pathname: string;
}) {
    const theme = useTheme();

    const path = pathname.split("/");
    const game = path[1];

    const items = navItems[game];

    const data = useContext(DataContext);

    function getCurrentData(item: string) {
        const d = data.find(
            (d) =>
                convertNametoURL(d.name) === item ||
                convertNametoURL(d.fullName) === item
        );
        if (d) return d.fullName || d.name;
        else return "";
    }

    return (
        <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <NavLink href={`/${game}`}>
                <TextLabel
                    icon={`main/game-icons/${website.tag}`}
                    title={website.title}
                    titleProps={{
                        variant: "body2",
                        color:
                            path.length > 2
                                ? theme.appbar.color.primary
                                : theme.text.selected,
                    }}
                    isLink={path.length > 2}
                />
            </NavLink>
            {path.slice(2).map((item, index) => (
                <NavLink
                    key={index}
                    href={`/${game}/${path.slice(2, index + 3).join("/")}`}
                    disabled={index + 2 === path.length - 1}
                >
                    <TextLabel
                        title={
                            items.find((i) => item === i.href)?.title ||
                            getCurrentData(item)
                        }
                        titleProps={{
                            variant: "body2",
                            color:
                                index + 2 !== path.length - 1
                                    ? theme.appbar.color.primary
                                    : theme.text.selected,
                        }}
                        isLink={index + 2 !== path.length - 1}
                    />
                </NavLink>
            ))}
        </MuiBreadcrumbs>
    );
}
