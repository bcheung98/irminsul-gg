"use client";

import { BaseSyntheticEvent, useRef, useState } from "react";

// Component imports
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Helper imports
import { themeList } from "@/themes/theme";
import { useSettingsStore } from "@/stores/useSettingsStore";

export default function SettingsList() {
    const theme = useTheme();

    const { theme: themeIndex, setTheme } = useSettingsStore();

    const toggleButtonsParams = {
        spacing: 0,
        padding: "4px 8px",
        highlightOnHover: false,
    };

    return (
        <Box>
            <ToggleButtons
                buttons={themeButtons}
                value={themeIndex}
                exclusive
                onChange={(_: BaseSyntheticEvent, newValue: number) => {
                    if (newValue !== null) {
                        setTheme(newValue);
                    }
                }}
                {...toggleButtonsParams}
            />
        </Box>
    );
}

const themeButtons = themeList.map((theme) => ({
    value: theme.id,
    label: theme.name,
}));
