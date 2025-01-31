import { useState, useEffect } from "react";
import parse from "html-react-parser";

// Component imports
import MainContentBox from "custom/MainContentBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Stack,
    Divider,
    Card,
    LinearProgress,
} from "@mui/material";

// Type imports
import { Post } from "types/common";

function Blog() {
    const documentTitle = `Blog - Irminsul.GG`;
    const documentDesc = `The latest updates from Irminsul.GG`;
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
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // https://api.irminsul.gg/main/blog.json
        fetch("https://api.irminsul.gg/main/blog.json")
            .then((response) => response.json())
            .then((data: Post[]) => {
                setPosts(data.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <MainContentBox
            title="Latest Updates"
            contentProps={{ padding: matches_up_sm ? "24px" : "16px" }}
        >
            <Stack spacing={{ xs: 2, sm: 3 }} divider={<Divider />}>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: theme.background(1, "light"),
                                p: 2,
                            }}
                        >
                            <TextStyled variant="h6-styled">
                                {post.title}
                            </TextStyled>
                            <br />
                            <Text component="span" variant="body2">
                                {parse(post.description)}
                            </Text>
                            <br />
                            <br />
                            <Text>{`- BC (${post.date})`}</Text>
                        </Card>
                    ))
                ) : (
                    <LinearProgress color="info" />
                )}
            </Stack>
        </MainContentBox>
    );
}

export default Blog;
