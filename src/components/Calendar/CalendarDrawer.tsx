// Component imports
import SettingsItem from "@/components/Settings/SettingsItem";
import ToggleButtons from "@/components/ToggleButtons";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import Switch from "@/components/Switch";

// MUI imports
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameList } from "@/context";
import { useCalendarStore, useServerStore } from "@/stores";
import { serverButtons, serverButtonsUma } from "@/data/settings";

// Type imports
import { GameInfo, Server } from "@/types";

export default function CalendarDrawer() {
    const games = useGameList().sort((a, b) => a.name.localeCompare(b.name));
    const server = useServerStore();
    const settings = useCalendarStore();
    const { setCalendarSettings } = useCalendarStore();

    function GameItem(props: GameInfo) {
        return (
            <Stack spacing={1} sx={{ px: 2 }}>
                <TextLabel
                    icon={`main/game-icons/${props.shortName}`}
                    iconProps={{ size: 24 }}
                    title={props.name}
                    titleProps={{ variant: "subtitle1" }}
                />
                <Stack spacing={1}>
                    <SettingsItem
                        label="Server"
                        alignItems="center"
                        input={
                            <ToggleButtons
                                buttons={
                                    props.tag === "uma"
                                        ? serverButtonsUma
                                        : serverButtons
                                }
                                value={server[props.tag]}
                                exclusive
                                onChange={(
                                    _: React.BaseSyntheticEvent,
                                    newValue: Server
                                ) => {
                                    if (newValue !== null) {
                                        server.setServer(props.tag, newValue);
                                    }
                                }}
                                spacing={0}
                                padding="4px 8px"
                                highlightOnHover={false}
                            />
                        }
                    />
                    <Stack>
                        <SettingsItem
                            label="Show banners"
                            alignItems="center"
                            input={
                                <Switch
                                    checked={settings[props.tag].enabled}
                                    onChange={(event) =>
                                        setCalendarSettings(
                                            props.tag,
                                            "enabled",
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                        />
                        <SettingsItem
                            label="Show full duration"
                            alignItems="center"
                            input={
                                <Switch
                                    checked={settings[props.tag].fullDuration}
                                    onChange={(event) =>
                                        setCalendarSettings(
                                            props.tag,
                                            "fullDuration",
                                            event.target.checked
                                        )
                                    }
                                />
                            }
                        />
                    </Stack>
                </Stack>
            </Stack>
        );
    }

    return (
        <>
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            <Stack
                spacing={3}
                sx={{
                    width: { xs: "100vw", sm: "350px" },
                    height: "100vh",
                    py: 2,
                }}
            >
                <Text sx={{ px: 2 }}>Calendar Settings</Text>
                <Stack
                    spacing={2}
                    divider={
                        <Divider
                            sx={(theme) => ({
                                borderColor: theme.border.color.secondary,
                            })}
                        />
                    }
                >
                    {games.map((game) => (
                        <GameItem key={game.tag} {...game} />
                    ))}
                </Stack>
            </Stack>
        </>
    );
}
