"use client";

import { BaseSyntheticEvent, useRef, useState } from "react";

// Component imports
import ToggleButtons from "@/components/ToggleButtons";
import Switch from "@/components/Switch";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { useSettingsStore } from "@/stores/useSettingsStore";
import { statDisplayButtons, themeButtons } from "@/data/settings";
import {
    toggleButtonsParams,
    settingsBoxStyle,
    settingsTextStyle,
} from "./Settings.styles";

// Type imports
import { SkillDisplay } from "@/types";

export default function SettingsList() {
    const theme = useTheme();

    const {
        theme: themeIndex,
        statDisplay,
        hideUnreleasedContent,
        setTheme,
        setStatDisplay,
        toggleUnreleasedContent,
    } = useSettingsStore();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const settingsList = [
        {
            label: "Theme",
            options: (
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
            ),
        },
        {
            label: "Stat Display",
            options: (
                <ToggleButtons
                    buttons={statDisplayButtons}
                    value={statDisplay}
                    exclusive
                    onChange={(
                        _: BaseSyntheticEvent,
                        newValue: SkillDisplay
                    ) => {
                        if (newValue !== null) {
                            setStatDisplay(newValue);
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
    ];

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ px: 1 }}>
            <Stack spacing={2}>
                {settingsList.map((setting, index) => (
                    <Box key={index} sx={settingsBoxStyle}>
                        <Text variant="subtitle1" sx={settingsTextStyle}>
                            {setting.label}
                        </Text>
                        {setting.options}
                    </Box>
                ))}
            </Stack>
            <Box>
                <Box sx={settingsBoxStyle}>
                    <Stack direction="row" alignItems="center">
                        <Text variant="subtitle1" sx={settingsTextStyle}>
                            Forbidden Knowledge
                        </Text>
                        <IconButton onClick={toggleDropdownState}>
                            <HelpIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    </Stack>
                    <Switch
                        checked={!hideUnreleasedContent}
                        onChange={() => toggleUnreleasedContent()}
                    />
                </Box>
                <Collapse in={dropdownOpen} timeout="auto">
                    <Text component="span" variant="subtitle2">
                        Enabling this option will allow you to view content from
                        the game's beta version.
                        <br />
                        Any information from the beta is heavily subject to
                        change and will usually be incomplete and/or inaccurate.
                        <br />
                        Please note that updates from the beta are not done
                        automatically and may differ from other websites that
                        you might use.
                    </Text>
                </Collapse>
            </Box>
        </Stack>
    );
}
