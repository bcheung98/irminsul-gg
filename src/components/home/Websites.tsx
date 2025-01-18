// Component imports
import WebsiteCard from "custom/WebsiteCard";

// MUI imports
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { Website } from "types/common";

function Websites({ websites }: { websites: Website[] }) {
    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container spacing={4}>
                {websites.map((site) => (
                    <Grid key={site.tag} size={{ xs: 12, sm: 6, md: 3 }}>
                        <WebsiteCard site={site} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Websites;
