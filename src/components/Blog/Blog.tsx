"use client";

// Component imports
import BlogCard from "@/components/Blog/BlogCard";
import Text from "@/components/Text";

// MUI imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Blog() {
    return (
        <Stack
            spacing={6}
            sx={{
                position: "relative",
                mt: { xs: 4, md: 12 },
                alignItems: "center",
                userSelect: "none",
            }}
        >
            <Box sx={{ px: 2, textAlign: "center" }}>
                <Text variant="h4" weight="highlight" gutterBottom>
                    Blog
                </Text>
                <Text>
                    Keep up with the latest news and content of Irminsul.GG.
                    <br />
                    Join the Discord server for more updates.
                </Text>
            </Box>
            <Container maxWidth="xl" disableGutters sx={{ px: 6 }}>
                <Grid container spacing={4}>
                    {blogList.reverse().map((post) => (
                        <Grid key={post.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                            <BlogCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Stack>
    );
}
