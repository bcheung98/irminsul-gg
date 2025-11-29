import { usePathname } from "next/navigation";

// Component imports
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Helper imports
import { useDataContext } from "@/context";
import { formatHref } from "@/utils";
import { navItems } from "@/data/navItems";

// Type imports
import { Game, GameInfo } from "@/types";

export default function Breadcrumbs({ website }: { website: GameInfo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const pathname = usePathname().split("/");
    const game = pathname[1] as Game;

    const items = navItems[game];

    const dataContext = useDataContext();

    function getCurrentData(item: string) {
        const data = dataContext.find((d) => formatHref(d.url) === item);
        if (data) return data.displayName || data.name;
        else return "";
    }

    return (
        <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <TextLabel
                icon={matches && `main/game-icons/${website.shortName}`}
                title={matches ? website.name : website.shortName}
                titleProps={{
                    variant: matches ? "body2" : "subtitle2",
                    color:
                        pathname.length > 2
                            ? theme.appbar.color.primary
                            : theme.text.selected,
                    sx: {
                        userSelect: "none",
                        textShadow:
                            pathname.length > 2
                                ? "none"
                                : `${theme.text.selected} 1px 1px 16px`,
                    },
                }}
                href={pathname.length > 2 ? `/${game}` : ""}
            />
            {pathname.slice(2).map((item, index) => (
                <TextLabel
                    title={
                        items.find((i) => item === i.href)?.title ||
                        getCurrentData(item)
                    }
                    titleProps={{
                        variant: matches ? "body2" : "subtitle2",
                        color:
                            index + 2 !== pathname.length - 1
                                ? theme.appbar.color.primary
                                : theme.text.selected,
                        sx: {
                            userSelect: "none",
                            textShadow:
                                index + 2 !== pathname.length - 1
                                    ? "none"
                                    : `${theme.text.selected} 1px 1px 16px`,
                        },
                    }}
                    href={
                        index + 2 !== pathname.length - 1
                            ? `/${game}/${pathname
                                  .slice(2, index + 3)
                                  .join("/")}`
                            : ""
                    }
                />
            ))}
        </MuiBreadcrumbs>
    );
}
