"use client";

import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import InfoCard from "@/components/InfoCard";

// MUI imports
import { useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import versions from "@/data/versions";

// Type imports
import { BaseDataWithRelease } from "@/types";

interface Data extends BaseDataWithRelease {
    [key: string]: any;
}

interface VersionHighlightsProps {
    characters: Data[];
    weapons: Data[];
}

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
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                (a.fullName || a.displayName).localeCompare(
                    b.fullName || b.displayName
                )
        );

    const weapons = props.weapons
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                (a.fullName || a.displayName).localeCompare(
                    b.fullName || b.displayName
                )
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
        <Box sx={{ pt: 2 }}>
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
                contentProps={{ padding: 2, overflowX: "clip" }}
            >
                <Stack spacing={3}>
                    <Text variant="h6">
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
                                    icon={`genshin/icons/Aether`}
                                    iconProps={{ size: 32 }}
                                    title={`New Characters`}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {characters.map((character) => (
                                        <InfoCard
                                            tag="genshin/characters"
                                            key={character.id}
                                            name={character.name}
                                            displayName={character.fullName}
                                            rarity={character.rarity}
                                            badgeLeft={{
                                                element: character.element,
                                                weaponType:
                                                    character.weaponType,
                                            }}
                                            background={theme.background(0)}
                                            href={character.url}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                        {weapons.length > 0 && (
                            <Grid sx={gridContainerStyle} size="auto">
                                <TextLabel
                                    icon={`genshin/icons/Weapons`}
                                    iconProps={{ size: 32 }}
                                    title={`New Weapons`}
                                    titleProps={{ variant: "h6" }}
                                />
                                <Grid container spacing={3} sx={gridStyle}>
                                    {weapons.map((weapon) => (
                                        <InfoCard
                                            tag="genshin/weapons"
                                            key={weapon.id}
                                            name={weapon.name}
                                            displayName={weapon.displayName}
                                            rarity={weapon.rarity}
                                            badgeLeft={{
                                                weaponType: weapon.weaponType,
                                                subStat: weapon.subStat,
                                            }}
                                            background={theme.background(0)}
                                            href={weapon.url}
                                            url=""
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </ContentBox>
        </Box>
    );
}
