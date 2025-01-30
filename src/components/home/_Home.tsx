// Component imports
import Websites from "./Websites";
import Blog from "./Blog";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function Home() {
    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <Box sx={{ px: "24px" }}>
            <Stack spacing={1} sx={{ textAlign: "center", my: "48px" }}>
                <TextStyled variant="h4" sx={{ fontWeight: 400 }}>
                    Welcome to IRMINSUL.GG!
                </TextStyled>
                <Text variant="h6">
                    <span style={{ fontWeight: 400 }}>IRMINSUL.GG</span> is a
                    database and companion website for various gacha games.
                    <br />
                    Select a branch of Irminsul to get started:
                </Text>
            </Stack>
            <Stack spacing={32} alignItems="center">
                <Websites websites={websites} />
                <Blog />
            </Stack>
        </Box>
    );
}

export default Home;
