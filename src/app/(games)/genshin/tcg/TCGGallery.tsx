"use client";

// Component imports
import Text from "@/components/Text";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

export default function TCGGallery() {
    const theme = useTheme();

    return (
        <>
            <Stack spacing={2} sx={{ p: 1 }}>
                <Text variant="h5" weight="highlight">
                    TCG
                </Text>
            </Stack>
            <Card
                sx={{
                    p: 2,
                    mt: "96px",
                    mx: "auto",
                    backgroundColor: theme.background(1),
                    width: theme.breakpoints.values.sm,
                    borderRadius: theme.contentBox.border.radius,
                }}
            >
                <Stack
                    alignItems="center"
                    spacing={2}
                    sx={{
                        textAlign: "center",
                        userSelect: "none",
                    }}
                >
                    <Text variant="h4" weight="highlight">
                        Under construction!
                    </Text>
                    <NavLink
                        href="https://genshin.irminsul.gg/tcg/"
                        openInNewTab
                    >
                        <Text
                            variant="h6"
                            weight="highlight"
                            sx={{
                                color: theme.text.selected,
                                textDecoration: "underline",
                            }}
                        >
                            Please use the old site for now
                        </Text>
                    </NavLink>
                </Stack>
            </Card>
        </>
    );
}
