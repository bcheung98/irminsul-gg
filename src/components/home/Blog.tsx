import { useState, useEffect } from "react";
import parse from "html-react-parser";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    Container,
    Paper,
    Stack,
    Divider,
    Card,
} from "@mui/material";

// Type imports
import { Post } from "types/common";

function Blog() {
    const theme = useTheme();

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
        <Container maxWidth="lg" disableGutters sx={{ mt: "256px" }}>
            <Paper
                sx={{
                    backgroundColor: theme.background(2),
                    p: 3,
                    borderRadius: "16px",
                }}
            >
                <Stack spacing={3} divider={<Divider />}>
                    {posts.map((post, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: theme.background(2, "light"),
                                p: 2,
                            }}
                        >
                            <TextStyled
                                variant="h4-styled"
                                sx={{ fontWeight: 400 }}
                            >
                                {post.title}
                            </TextStyled>
                            <br />
                            <Text component="span">
                                {parse(post.description)}
                            </Text>
                            <br />
                            <br />
                            <Text>{`-BC (${post.date})`}</Text>
                        </Card>
                    ))}
                </Stack>
            </Paper>
        </Container>
    );
}

export default Blog;
