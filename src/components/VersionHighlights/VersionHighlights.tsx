"use client";

import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import VersionReleaseDate from "./VersionReleaseDate";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import versions from "@/data/versions";
import {
    renderInfoCard,
    textLabelIcon,
    textLabelTitle,
} from "./VersionHighlights.utils";
import { useVersionContent } from "./VersionHighlights.hooks";

// Type imports
import type { Game } from "@/types";
import type {
    VersionCategory,
    VersionHighlightsProps,
    VersionItemData,
} from "./VersionHighlights.types";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function VersionHighlights(props: VersionHighlightsProps) {
    const game = useGameTag();

    const updates = versions[game];

    const [index, setIndex] = useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) {
            setIndex(index + 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const { version, name, releaseDate } = updates[index];
    const { characters, weapons, equipment, bangboos } = useVersionContent(
        game,
        props,
        version,
    );

    const selectProps = {
        index,
        data: updates,
        handleIndexChange,
        handleIndexChangeLeft,
        handleIndexChangeRight,
    };

    const categories = [
        { category: "characters", items: characters },
        { category: "weapons", items: weapons },
        { category: "equipment", items: equipment },
        { category: "bangboos", items: bangboos ?? [] },
    ] satisfies {
        category: VersionCategory;
        items: VersionItemData[];
    }[];

    return (
        <ContentBox
            header="Version Highlights"
            actions={
                <SelectWithArrows {...selectProps}>
                    {updates.map((version, index) => (
                        <MenuItem key={version.version} value={index}>
                            <Text
                                variant="subtitle1"
                                sx={{ textAlign: "center" }}
                            >
                                {version.version}
                            </Text>
                        </MenuItem>
                    ))}
                </SelectWithArrows>
            }
            contentProps={{ padding: "16px 24px", overflowX: "clip" }}
        >
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Text variant="h6" weight="highlight">
                        {version} - <i>{name}</i>
                    </Text>
                    <VersionReleaseDate releaseDate={releaseDate} />
                </Stack>
                <Grid
                    container
                    columnSpacing={{ xs: 6, md: 10 }}
                    rowSpacing={3}
                >
                    {categories.map(({ category, items }) => (
                        <VersionHighlightCategory
                            key={category}
                            game={game}
                            category={category}
                            items={items}
                        />
                    ))}
                </Grid>
            </Stack>
        </ContentBox>
    );
}

function VersionHighlightCategory({
    game,
    category,
    items,
}: {
    game: Game;
    category: keyof VersionHighlightsProps;
    items: VersionItemData[];
}) {
    const theme = useTheme();

    if (!items.length) return null;

    return (
        <Grid
            sx={{
                minWidth: "40%",
                maxWidth: "100%",
            }}
            size="auto"
        >
            <TextLabel
                icon={textLabelIcon(game, category)}
                iconProps={{ size: 32 }}
                title={textLabelTitle(game, category)}
                titleProps={{ variant: "h6" }}
            />
            <Grid
                container
                spacing={3}
                sx={{
                    p: 2,
                    maxHeight: "720px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                }}
            >
                {items.map((item) =>
                    renderInfoCard(game, category, item, theme.background(0)),
                )}
            </Grid>
        </Grid>
    );
}
