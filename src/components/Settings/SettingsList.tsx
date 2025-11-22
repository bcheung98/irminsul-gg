// Component imports
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";
import { useSettingsStore } from "@/stores/useSettingsStore";
import {
    forbiddenKnowledge,
    statDisplayButtons,
    themeButtons,
} from "@/data/settings";

// Type imports
import { SkillDisplay } from "@/types";

export default function SettingsList() {
    const game = useGameTag();

    const {
        theme: themeIndex,
        statDisplay,
        hideUnreleasedContent,
        setTheme,
        setStatDisplay,
        setUnreleasedContent,
    } = useSettingsStore();

    const toggleButtonsParams = {
        spacing: 0,
        padding: "0px 8px",
        highlightOnHover: false,
    };

    const settingsList: SettingsItemProps[] = [
        {
            label: "Theme",
            input: (
                <ToggleButtons
                    buttons={themeButtons}
                    value={themeIndex}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: number
                    ) => {
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
            input: (
                <ToggleButtons
                    buttons={statDisplayButtons}
                    value={statDisplay}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
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
        {
            label: "Forbidden Knowledge",
            input: (
                <ToggleButtons
                    buttons={forbiddenKnowledge}
                    value={hideUnreleasedContent}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: boolean
                    ) => {
                        if (newValue !== null) {
                            setUnreleasedContent(newValue);
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
            description: (
                <Text variant="subtitle2">
                    Enabling this option will allow you to view content from the
                    game's beta version.
                    <br />
                    Any information from the beta is heavily subject to change
                    and will usually be incomplete and/or inaccurate.
                    <br />
                    Please note that updates from the beta are not done
                    automatically and may differ from other websites that you
                    might use.
                </Text>
            ),
        },
    ];

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={2}>
                {settingsList.map((setting, index) => (
                    <SettingsItem key={index} {...setting} />
                ))}
            </Stack>
        </Stack>
    );
}
