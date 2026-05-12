// Component imports
import GamesMenuItem from "./GamesMenuItem";
import Text from "@/components/Text";
import DiscordButton from "@/components/DiscordButton";
import KofiButton from "@/components/KofiButton";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameList, useGameTag } from "@/context";

export default function GamesMenuList({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const gameTag = useGameTag();
    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    if (gameTag) {
        const index = games.findIndex((game) => game.tag === gameTag);
        index > -1 && games.unshift(games.splice(index, 1)[0]);
    }

    return (
        <Stack
            spacing={1}
            divider={
                <Divider sx={{ borderColor: theme.border.color.secondary }} />
            }
        >
            {!matches && (
                <Stack
                    direction="row"
                    sx={{
                        display: { md: "none" },
                        p: "0px 8px 0px 16px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Games</Text>
                    <CloseButton
                        onClick={handleClose}
                        hoverColor={theme.drawer.backgroundColor.hover}
                    />
                </Stack>
            )}
            <Stack spacing={0.5}>
                {games.map((game, index) => (
                    <GamesMenuItem
                        key={index}
                        game={game}
                        handleClose={handleClose}
                    />
                ))}
            </Stack>
            {!matches && (
                <Stack spacing={1} sx={{ p: "4px 16px" }}>
                    <DiscordButton />
                    <KofiButton />
                </Stack>
            )}
        </Stack>
    );
}
