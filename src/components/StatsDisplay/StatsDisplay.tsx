import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import StatsTable from "@/components/StatsTable";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { getStats } from "./StatsDisplay.utils";
import { useTextColor } from "@/helpers/styles";
import { useStore, useSettingsStore } from "@/stores";

// Type imports
import { StatsDisplayProps } from "./StatsDisplay.types";
import { SkillDisplay } from "@/types";

export default function StatsDisplay({
    game,
    title = "Stats",
    stats,
    attributes,
    initialValue,
}: StatsDisplayProps) {
    const theme = useTheme();

    const { levels, data } = getStats({ stats, attributes })[game];

    const textColor = useTextColor(theme.text);

    const currentStatDisplay =
        useStore(useSettingsStore, (state) => state.statDisplay) || "slider";
    const [mode, setMode] = useState<SkillDisplay>(currentStatDisplay);

    useEffect(() => {
        setMode(currentStatDisplay);
    }, [currentStatDisplay]);

    return (
        <Stack spacing={mode === "slider" ? 1 : 0}>
            <Text variant="h6" weight="highlight">
                {title}
            </Text>
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    initialValue: initialValue || levels.length,
                    sx: {
                        minWidth: "100px",
                        maxWidth: "50%",
                        ml: "8px",
                        color: textColor(game, attributes.element),
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "50%" }
                                : "100%",
                    },
                }}
            />
        </Stack>
    );
}
