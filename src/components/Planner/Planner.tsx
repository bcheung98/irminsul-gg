"use client";

// Component imports
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { DataType } from "@/types";

export default function Planner<T extends DataType, U extends DataType>(props: {
    characters: T[];
    weapons: U[];
}) {
    return (
        <Stack spacing={2} sx={{ p: 1 }}>
            <Text variant="h5" weight="highlight">
                Ascension Planner
            </Text>
        </Stack>
    );
}
