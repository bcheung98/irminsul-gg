"use client";

// Component imports
import ContentBox from "@/components/ContentBox";
import PlannerCardRoot from "@/components/PlannerCardRoot";
import PlannerActions from "./PlannerActions";
import Dropdown from "@/components/Dropdown";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { categories } from "@/data/categories";

// Type imports
import { Game } from "@/types";
import { PlannerDataContext } from "./Planner.utils";
import { PlannerItemData } from "@/types/planner";

export default function Planner({
    characters,
    weapons,
}: {
    characters: PlannerItemData[];
    weapons: PlannerItemData[];
}) {
    const theme = useTheme();

    const game = useGameTag() as Exclude<Game, "uma">;

    const store = usePlannerStore();

    const titleCharacters = `${categories[`${game}/characters`].slice(0, -1)}`;
    const titleWeapons = `${categories[`${game}/weapons`].slice(0, -1)}`;

    const selectedCharacters = store[`${game}/characters`];
    const selectedWeapons = store[`${game}/weapons`];
    const items = [...selectedCharacters, ...selectedWeapons];

    return (
        <PlannerDataContext value={{ characters, weapons }}>
            <Stack
                spacing={2}
                sx={{ p: 1, maxWidth: theme.breakpoints.values.xl }}
            >
                <Text variant="h5" weight="highlight">
                    Ascension Planner
                </Text>
                <ContentBox
                    header={<PlannerActions />}
                    headerProps={{ padding: "16px" }}
                >
                    {items.length > 0 ? (
                        <Dropdown
                            title="Total Materials Required"
                            textVariant="body1"
                        ></Dropdown>
                    ) : (
                        <Text weight="highlight">
                            {`Add a ${titleCharacters} or ${titleWeapons} to get started!`}
                        </Text>
                    )}
                </ContentBox>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid key={item.id} size={{ xs: 12, lg: 6 }}>
                            <PlannerCardRoot
                                item={item}
                                type={
                                    "element" in item ? "characters" : "weapons"
                                }
                                chipColor={theme.background(0)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </PlannerDataContext>
    );
}
