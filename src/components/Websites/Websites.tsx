"use client";

// Component imports
import WebsiteCard from "@/components/WebsiteCard";
import WebsiteCardMobile from "@/components/WebsiteCard/WebsiteCardMobile";

// MUI imports
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameList } from "@/context";

export default function Websites({
    action,
}: {
    action: (newIndex: number) => void;
}) {
    const games = useGameList().sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Grid container spacing={{ xs: 2, sm: 4 }}>
            {games.map(
                (game, index) =>
                    game.enabled && (
                        <Grid key={game.tag} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <WebsiteCard
                                game={game}
                                index={index}
                                handleIndexChange={action}
                            />
                            <WebsiteCardMobile
                                game={game}
                                index={index}
                                handleIndexChange={action}
                            />
                        </Grid>
                    ),
            )}
        </Grid>
    );
}
