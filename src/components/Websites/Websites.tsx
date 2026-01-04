"use client";

// Component imports
import WebsiteCard from "@/components/WebsiteCard";

// MUI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameList } from "@/context";

export default function Websites({
    action,
}: {
    action: (newIndex: number) => void;
}) {
    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Container maxWidth="xl" disableGutters sx={{ px: 6 }}>
            <Grid container spacing={4}>
                {games.map((game, index) => (
                    <Grid key={game.tag} size={{ xs: 12, sm: 6, md: 3 }}>
                        <WebsiteCard
                            game={game}
                            index={index}
                            handleIndexChange={action}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
