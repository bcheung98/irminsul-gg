"use client";

import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
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

// Type imports
import { VersionHighlightsProps } from "./VersionHighlights.types";

export default function VersionHighlights(props: VersionHighlightsProps) {
    const theme = useTheme();

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

    const { version, name } = updates[index];

    const characters = props.characters
        .filter((character) => character.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const weapons = props.weapons
        .filter((weapon) => weapon.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const equipment = props.equipment
        .filter((equipment) => equipment.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const bangboo = props.bangboos
        ?.filter((bangboo) => bangboo.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );

    const selectProps = {
        index,
        data: updates,
        handleIndexChange,
        handleIndexChangeLeft,
        handleIndexChangeRight,
    };

    const gridContainerStyle = {
        minWidth: "40%",
        maxWidth: "100%",
    };

    const gridStyle = {
        p: 2,
        maxHeight: "720px",
        overflowY: "auto",
    };

    return (
        <Box>
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
                    <Text variant="h6" weight="highlight">
                        {version} - <i>{name}</i>
                    </Text>
                    <Grid
                        container
                        columnSpacing={{ xs: 6, md: 10 }}
                        rowSpacing={3}
                    >
                        {characters.length > 0 && (
                            <Grid sx={gridContainerStyle} size="auto">
                                <TextLabel
                                    icon={textLabelIcon(game, "characters")}
                                    iconProps={{ size: 32 }}
                                    title={textLabelTitle(game, "characters")}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {characters.map((character) =>
                                        renderInfoCard(
                                            game,
                                            "characters",
                                            character,
                                            theme.background(0)
                                        )
                                    )}
                                </Grid>
                            </Grid>
                        )}
                        {weapons.length > 0 && (
                            <Grid sx={gridContainerStyle} size="auto">
                                <TextLabel
                                    icon={textLabelIcon(game, "weapons")}
                                    iconProps={{ size: 32 }}
                                    title={textLabelTitle(game, "weapons")}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {weapons.map((weapon) =>
                                        renderInfoCard(game, "weapons", weapon)
                                    )}
                                </Grid>
                            </Grid>
                        )}
                        {equipment.length > 0 && (
                            <Grid sx={gridContainerStyle} size="auto">
                                <TextLabel
                                    icon={textLabelIcon(game, "equipment")}
                                    iconProps={{ size: 32 }}
                                    title={textLabelTitle(game, "equipment")}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {equipment.map((item) =>
                                        renderInfoCard(game, "equipment", item)
                                    )}
                                </Grid>
                            </Grid>
                        )}
                        {bangboo && bangboo.length > 0 && (
                            <Grid sx={gridContainerStyle} size="auto">
                                <TextLabel
                                    icon={textLabelIcon(game, "bangboos")}
                                    iconProps={{ size: 32 }}
                                    title={textLabelTitle(game, "bangboos")}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {bangboo.map((item) =>
                                        renderInfoCard(game, "bangboos", item)
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </ContentBox>
        </Box>
    );
}
