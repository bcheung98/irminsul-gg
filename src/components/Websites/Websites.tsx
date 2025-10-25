"use client";

// Component imports
import WebsiteCard from "../WebsiteCard";

// MUI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameList } from "@/context";

export default function Websites() {
    const games = useGameList();

    return (
        <Container maxWidth="xl" disableGutters sx={{ px: 6 }}>
            <Grid container spacing={4}>
                {games
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((website) => (
                        <Grid key={website.tag} size={{ xs: 12, sm: 6, md: 3 }}>
                            <WebsiteCard game={website} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}
