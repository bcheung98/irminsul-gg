// Component imports
import CalendarSettingsDaySelect from "./CalendarSettingsDaySelect";
import CalendarSettingsGameItem from "./CalendarSettingsGameItem";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameList } from "@/context";

export default function CalendarSettings() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            <Stack
                spacing={3}
                sx={{
                    width: { xs: "100vw", sm: "350px" },
                    height: "100vh", // Extends border to bottom of screen
                    pt: { xs: 7, lg: 2 },
                    pb: 6,
                    borderRight: matches
                        ? `1px solid ${theme.border.color.secondary}`
                        : 0,
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                <Text weight="highlight" sx={{ px: 2 }}>
                    Calendar Settings
                </Text>
                <Stack
                    spacing={2}
                    divider={
                        <Divider
                            sx={{ borderColor: theme.border.color.secondary }}
                        />
                    }
                >
                    <CalendarSettingsDaySelect />
                    {games.map((game) => (
                        <CalendarSettingsGameItem key={game.tag} {...game} />
                    ))}
                </Stack>
            </Stack>
        </>
    );
}
