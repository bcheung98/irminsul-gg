"use client";

import { useEffect, useState, useTransition } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import HomePageGameBanners from "./HomePageGameBanners";

// MUI imports
import Grid from "@mui/material/Grid";

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
        <ContentBox header="Active Banners">
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
