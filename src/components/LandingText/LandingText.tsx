"use client";

// Component imports
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

export default function LandingText() {
    return (
        <Stack spacing={1} sx={{ mt: "96px", textAlign: "center" }}>
            <Text variant="h4" sx={{ fontWeight: 400 }}>
                Welcome to IRMINSUL.GG!
            </Text>
            <Text variant="h6">
                <span style={{ fontWeight: 400 }}>IRMINSUL.GG</span> is a
                database and companion website for various gacha games.
                <br />
                Select a branch of Irminsul to get started:
            </Text>
        </Stack>
    );
}
