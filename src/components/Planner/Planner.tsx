"use client";

import { useEffect, useMemo } from "react";

// Component imports
import PlannerTeams from "@/components/PlannerTeams";
import PlannerSettings from "./PlannerSettings";
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
import Divider from "@mui/material/Divider";
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
    const setItems = usePlannerStore((state) => state[`${game}/setItems`]);

    const teams = usePlannerStore((state) => state[`${game}/teams`]);
    const activeTeamId = usePlannerStore(
        (state) => state[`${game}/activeTeamId`],
    );

    const displayedItems = useMemo(() => {
        if (activeTeamId === null) return items;

        const activeTeam = teams.find((team) => team.id === activeTeamId);

        if (!activeTeam) return [];

        const itemsById = new Map(items.map((item) => [item.id, item]));

        return activeTeam.itemIDs
            .map((id) => itemsById.get(id))
            .filter((item): item is PlannerItemData => item !== undefined);
    }, [items, teams, activeTeamId]);

    useEffect(() => {
        if (!items.some((item) => "traces" in item)) return;

        setItems(
            items.map((item) => validatePlannerItem(item, characters, weapons)),
        );
    }, [game, items, characters, weapons]);

    const characterCategory = `${categories[`${game}/characters`].slice(0, -1)}`;
    const weaponCategory = `${categories[`${game}/weapons`].slice(0, -1)}`;

    const addItemText = `Add ${
        ((str: string) => /^[aeiou]/i.test(str))(characterCategory) ? "an" : "a"
    } ${characterCategory} or ${weaponCategory}`;

    const introText =
        activeTeamId === null
            ? `${addItemText} to get started!`
            : `${addItemText} to this team to get started!`;

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
                <Text
                    variant="h5"
                    weight="highlight"
                    sx={{ color: theme.text.page }}
                >
                    Ascension Planner
                </Text>
                <ContentBox
                    header={<PlannerTeams />}
                    actions={<PlannerSettings />}
                >
                    <Stack spacing={2} divider={<Divider />}>
                        {displayedItems.length > 0 ? (
                            <Dropdown
                                title="Total Materials Required"
                                textVariant="body1"
                                contentPadding="16px 0 0"
                                defaultOpen
                            >
                                <PlannerTotalCost />
                            </Dropdown>
                        ) : (
                            <Text weight="highlight">{introText}</Text>
                        )}
                        <FlexBox spacing={2} wrap>
                            <PlannerSelector type="characters" />
                            <PlannerSelector type="weapons" />
                            <PlannerSorter />
                        </FlexBox>
                    </Stack>
                </ContentBox>
                <Grid container spacing={2}>
                    {displayedItems.map((item) => (
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
