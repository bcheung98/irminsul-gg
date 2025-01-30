import { useEffect, useState } from "react";
import { Link } from "react-router";

// Component imports
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    alpha,
    Stack,
    Button,
    getContrastRatio,
    Card,
    Box,
} from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function PageNotFound() {
    const documentTitle = `Irminsul.GG`;
    const documentDesc = `A database and companion website for various gacha games.`;
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

    const theme = useTheme();

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        setTags(websites.map((website) => website.tag.toLowerCase()));
    }, [JSON.stringify(websites)]);
    const imgURL = `https://assets.irminsul.gg/${
        tags[getRandomInt(0, tags.length - 1)]
    }/emotes/error${getRandomInt(1, 5)}.png`;

    return (
        <Box sx={{ px: "24px" }}>
            <Card
                sx={{ p: 2, backgroundColor: alpha(theme.background(1), 0.75) }}
            >
                <Stack alignItems="center" spacing={2}>
                    <Image
                        src={imgURL}
                        alt="404"
                        style={{ width: "256px", height: "256px" }}
                        fallbackSrc="https://assets.irminsul.gg/genshin/emotes/error9.png"
                    />
                    <TextStyled variant="h4-styled">404</TextStyled>
                    <Text variant="h4">
                        The page you were looking for was not recorded in
                        Irminsul.
                    </Text>
                    <Button component={Link} to="/" variant="contained">
                        <TextStyled
                            variant="h6-styled"
                            sx={{
                                color:
                                    getContrastRatio(
                                        theme.palette.primary.main,
                                        theme.text.primary
                                    ) > 4.5
                                        ? theme.text.primary
                                        : theme.text.contrast,
                            }}
                        >
                            Back to Home
                        </TextStyled>
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}

export default PageNotFound;

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
