"use client";

// Component imports
import PlannerActions from "./PlannerActions";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Type imports
import { DataType } from "@/types";
import { PlannerDataContext } from "./Planner.utils";

export default function Planner<T extends DataType, U extends DataType>({
    characters,
    weapons,
}: {
    characters: T[];
    weapons: U[];
}) {
    const theme = useTheme();

    return (
        <PlannerDataContext value={{ characters, weapons }}>
            <Stack
                spacing={2}
                sx={{ p: 1, maxWidth: theme.breakpoints.values.xl }}
            >
                <Text variant="h5" weight="highlight">
                    Ascension Planner
                </Text>
                <PlannerActions />
            </Stack>
        </PlannerDataContext>
    );
}
