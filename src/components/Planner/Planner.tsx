"use client";

import { useEffect } from "react";

// Component imports
import PlannerSelector from "@/components/PlannerSelector";
import PlannerSorter from "@/components/PlannerSorter";
import PlannerTotalCost from "@/components/PlannerTotalCost";
import PlannerCardRoot from "@/components/PlannerCardRoot";
import FlexBox from "@/components/FlexBox";
import ContentBox from "@/components/ContentBox";
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
import { validatePlannerItem } from "@/helpers/planner";
import { PlannerDataContext } from "./Planner.utils";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerItemData } from "@/types/planner";

export default function Planner({
    characters,
    weapons,
}: {
    characters: PlannerItemData[];
    weapons: PlannerItemData[];
}) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const items = usePlannerStore((state) => state[`${game}/items`]);

    useEffect(() => {
        if (!items.some((item) => "traces" in item)) return;

        usePlannerStore.setState(() => ({
            [`${game}/items`]: items.map((item) =>
                validatePlannerItem(item, characters, weapons),
            ),
        }));
    }, [game, items, characters, weapons]);

    const characterCategory = `${categories[`${game}/characters`].slice(0, -1)}`;
    const weaponCategory = `${categories[`${game}/weapons`].slice(0, -1)}`;

    return (
        <PlannerDataContext value={{ characters, weapons }}>
            <Stack
                spacing={2}
                sx={{
                    px: 1,
                    py: { xs: 1, sm: 2, lg: 1 },
                    maxWidth: theme.breakpoints.values.xl,
                }}
            >
                <Text variant="h5" weight="highlight">
                    Ascension Planner
                </Text>
                <ContentBox
                    header={
                        <FlexBox spacing={2} wrap>
                            <PlannerSelector type="characters" />
                            <PlannerSelector type="weapons" />
                            <PlannerSorter />
                        </FlexBox>
                    }
                    headerProps={{ padding: "16px" }}
                >
                    {items.length > 0 ? (
                        <Dropdown
                            title="Total Materials Required"
                            textVariant="body1"
                            contentPadding="16px 0"
                            defaultOpen
                        >
                            <PlannerTotalCost />
                        </Dropdown>
                    ) : (
                        <Text weight="highlight">
                            {`Add ${
                                startsWithVowel(characterCategory) ? "an" : "a"
                            } ${characterCategory} or ${weaponCategory} to get started!`}
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

const startsWithVowel = (str: string) => /^[aeiou]/i.test(str);
