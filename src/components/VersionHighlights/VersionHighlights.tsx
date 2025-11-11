"use client";

import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";

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
import TextLabel from "../TextLabel";
import InfoCard from "../InfoCard";

interface Data extends BaseDataWithRelease {
    [key: string]: any;
}

interface VersionHighlightsProps {
    characters: Data[];
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
                b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
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
                                <Text sx={{ textAlign: "center" }}>
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
