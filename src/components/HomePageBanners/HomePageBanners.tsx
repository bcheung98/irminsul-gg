"use client";

import { useEffect, useState, useTransition } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import TextLabel from "@/components/TextLabel";
import HomePageGameBanners from "./HomePageGameBanners";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Helper imports
import { useGameList } from "@/context";
import { getItems } from "@/components/SiteSearch/SiteSearch.utils";

// Type imports
import { Banner } from "@/types/banner";
import { SearchResult } from "@/components/SiteSearch";

export default function HomePageBanners({
    banners,
}: {
    banners: Record<string, Banner[]>;
}) {
    const theme = useTheme();

    const [, startDataTransition] = useTransition();
    const [data, setData] = useState<{
        characters: SearchResult[];
        weapons: SearchResult[];
    }>({ characters: [], weapons: [] });

    useEffect(() => {
        startDataTransition(async () => {
            const items = await getItems({
                hideUnreleasedContent: false,
                game: undefined,
                hideUmaJPContent: false,
                pathname: "calendar",
            });
            const characters = items.filter((item) =>
                item.category.endsWith("characters"),
            );
            const weapons = items.filter(
                (item) =>
                    item.category.endsWith("weapons") ||
                    item.category.endsWith("supports"),
            );
            setData({ characters, weapons });
        });
    }, []);

    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <ContentBox
            header="Active Banners"
            actions={
                <ButtonBase
                    href={`/calendar`}
                    sx={{
                        height: "28px",
                        px: 2,
                        borderRadius: "4px",
                        backgroundColor: theme.palette.info.main,
                        "&:hover": {
                            backgroundColor: theme.palette.info.dark,
                        },
                        transition: "background-color 0.15s",
                    }}
                >
                    <TextLabel
                        icon={
                            <ChevronRightIcon
                                sx={{
                                    color: theme.text.primary,
                                    fontSize: "18px",
                                }}
                            />
                        }
                        title={`View Gacha Calendar`}
                        titleProps={{ variant: "body2" }}
                        spacing={0.5}
                        reverse
                    />
                </ButtonBase>
            }
        >
            <Grid container spacing={2}>
                {games.map((game) => (
                    <Grid key={game.tag} size={{ xs: 12, lg: 6 }}>
                        <HomePageGameBanners
                            game={game}
                            banners={banners}
                            characters={data.characters}
                            weapons={data.weapons}
                        />
                    </Grid>
                ))}
            </Grid>
        </ContentBox>
    );
}
