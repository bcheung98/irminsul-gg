// Component imports
import SettingsItem, { SettingsItemProps } from "./SettingsItem";
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGame } from "@/context";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useServerStore } from "@/stores/useServerStore";
import {
    forbiddenKnowledge,
    serverButtons,
    statDisplayButtons,
    themeButtons,
} from "@/data/settings";

// Type imports
import { Game, Server, SkillDisplay } from "@/types";

export default function SettingsList() {
    const game = useGame();
    const gameTag = game.tag as Game;

    const {
        theme: themeIndex,
        statDisplay,
        hideUnreleasedContent,
        setTheme,
        setStatDisplay,
        setUnreleasedContent,
    } = useSettingsStore();

    const server = useServerStore();

    const toggleButtonsParams = {
        spacing: 0,
        padding: "0 8px",
        highlightOnHover: false,
    };

    const group1: SettingsItemProps[] = [
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
    ];

    if (game) {
        const serverSettings: SettingsItemProps = {
            label: `Server (${game.name})`,
            input: (
                <ToggleButtons
                    buttons={serverButtons}
                    value={server[gameTag]}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: Server
                    ) => {
                        if (newValue !== null) {
                            server.setServer(gameTag, newValue);
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        };
        group1.push(serverSettings);
    }

    const group2: SettingsItemProps[] = [
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

    const settings = [group1];
    if (gameTag !== "uma") {
        settings.push(group2);
    }

    return (
        <Stack spacing={2} divider={<Divider />}>
            {settings.map((group, index) => (
                <Stack key={index} spacing={2}>
                    {group.map((setting) => (
                        <SettingsItem key={setting.label} {...setting} />
                    ))}
                </Stack>
            ))}
        </Stack>
    );
}
