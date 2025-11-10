"use client";

import { useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectInput from "@/components/SelectInput";

// MUI imports
import { SelectChangeEvent, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

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

    return (
        <Box sx={{ pt: 2 }}>
            <ContentBox header="Version Highlights"></ContentBox>
        </Box>
    );
}
