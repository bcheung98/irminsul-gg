"use client";

// Component imports
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export default function LandingText() {
    const theme = useTheme();

    return (
        <Stack spacing={1} sx={{ px: 3 }}>
            <Text variant="h4" weight="home">
                Welcome to IRMINSUL.GG!
            </Text>
            <Text variant="h6">
                <span style={{ fontWeight: theme.font.weight.home }}>
                    IRMINSUL.GG
                </span>{" "}
                is a database and companion website for various gacha games.
                <br />
                Select a branch of Irminsul to get started:
            </Text>
        </Stack>
    );
}
