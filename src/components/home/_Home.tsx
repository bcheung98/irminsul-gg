// Component imports
import Websites from "./Websites";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function Home() {
    const documentTitle = `Irminsul.GG`;
    const documentDesc = `A database and companion website for various gacha games`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <Stack spacing={6}>
            <Stack spacing={1} sx={{ textAlign: "center" }}>
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
            <Websites websites={websites} />
        </Stack>
    );
}

export default Home;
