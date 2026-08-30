import { usePathname } from "next/navigation";
import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Helper imports
import { urls } from "@/api";
import { formatHref } from "@/utils";
import { navItems } from "@/data/navItems";
import { rarityMap } from "@/data/uma/common";

// Type imports
import { Game, GameInfo } from "@/types";

export default function Breadcrumbs({ website }: { website: GameInfo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const pathname = usePathname();
    const pathSplit = pathname.split("/");

    const game = pathSplit[1] as Game;
    const url = pathSplit.slice(1, 3).join("/") as keyof typeof urls;

    const { data, error, isLoading } = useSWR(urls[url], (url: string) =>
        fetch(url).then((r) => r.json()),
    );

    const pageData = !isLoading && !error ? data : [];

    const items = navItems[game];

    function getCurrentData(item: string) {
        const data = pageData.find(
            (d: BreadcrumbData) => formatHref(d.url || `${d.id}`) === item,
        );
        if (data) {
            let res = data.displayName || data.name;
            if (game === "uma") {
                if ("specialty" in data) {
                    res += ` (${rarityMap[data.rarity]} ${data.specialty})`;
                } else if ("conditions" in data) {
                    res = data.name.global || data.name.jp;
                } else {
                    res += ` (${data.outfit || "Original"})`;
                }
            }
            return res;
        } else return "";
    }

    return (
        <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <TextLabel
                icon={matches && `${game}/_common/Icon`}
                title={matches ? website.name : website.shortName}
                titleProps={{
                    variant: matches ? "body2" : "subtitle2",
                    color:
                        pathSplit.length > 2
                            ? theme.appbar.color.primary
                            : theme.text.selected,
                    sx: {
                        userSelect: "none",
                        textShadow:
                            pathSplit.length > 2
                                ? "none"
                                : `${theme.text.selected} 1px 1px 16px`,
                    },
                }}
                href={pathSplit.length > 2 ? `/${game}` : ""}
            />
            {pathSplit.slice(2).map((item, index) => (
                <TextLabel
                    title={
                        items.find((i) => item === i.href)?.title ||
                        getCurrentData(item)
                    }
                    titleProps={{
                        variant: matches ? "body2" : "subtitle2",
                        color:
                            index + 2 !== pathSplit.length - 1
                                ? theme.appbar.color.primary
                                : theme.text.selected,
                        sx: {
                            userSelect: "none",
                            textShadow:
                                index + 2 !== pathSplit.length - 1
                                    ? "none"
                                    : `${theme.text.selected} 1px 1px 16px`,
                        },
                    }}
                    href={
                        index + 2 !== pathSplit.length - 1
                            ? `/${game}/${pathSplit
                                  .slice(2, index + 3)
                                  .join("/")}`
                            : ""
                    }
                />
            ))}
        </MuiBreadcrumbs>
    );
}

interface BreadcrumbData {
    id: string | number;
    url?: string;
    displayName?: string;
    name:
        | string
        | {
              global?: string;
              jp?: string;
          };
    rarity?: keyof typeof rarityMap;
    specialty?: string;
    conditions?: unknown;
    outfit?: string;
}
