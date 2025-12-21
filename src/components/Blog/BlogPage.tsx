// Component imports
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Helper imports
import DateObject from "@/helpers/dates";

// Type imports
import { BlogPost } from "@/data/blog-list";

export default function BlogPage({
    children,
    post,
}: {
    children?: React.ReactNode;
    post?: BlogPost;
}) {
    const theme = useTheme();
    return (
        <Container
            sx={{
                mt: { xs: 4, md: 12 },
            }}
        >
            <Stack spacing={2}>
                <ButtonBase
                    href="/blog"
                    sx={{
                        width: "max-content",
                        height: "32px",
                        px: 2,
                        py: 0.5,
                        borderRadius: "4px",
                        backgroundColor: theme.palette.info.main,
                        "&:hover": {
                            backgroundColor: theme.palette.info.dark,
                        },
                        transition: "background-color 0.15s",
                    }}
                >
                    <TextLabel
                        icon={
                            <ChevronLeftIcon
                                sx={{
                                    color: theme.text.primary,
                                    fontSize: "18px",
                                }}
                            />
                        }
                        title="Back to blog"
                        titleProps={{ variant: "body2" }}
                    />
                </ButtonBase>
                <Card
                    sx={{
                        p: 3,
                        backgroundColor: theme.background(1),
                        borderRadius: theme.contentBox.border.radius,
                    }}
                >
                    {post ? (
                        <Stack spacing={3}>
                            <Stack spacing={1}>
                                <Text variant="subtitle1">
                                    {new DateObject(post.date).string}
                                </Text>
                                <Text variant="h4" weight="highlight">
                                    {post.title}
                                </Text>
                                {post.lastEdit && (
                                    <Text
                                        variant="subtitle2"
                                        sx={{
                                            color: theme.text.description,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {`Edited: ${
                                            new DateObject(post.lastEdit).string
                                        }`}
                                    </Text>
                                )}
                            </Stack>
                            <div>{children}</div>
                        </Stack>
                    ) : (
                        <Text variant="h6" weight="highlight">
                            Error: Could not find blog post
                        </Text>
                    )}
                </Card>
            </Stack>
        </Container>
    );
}
