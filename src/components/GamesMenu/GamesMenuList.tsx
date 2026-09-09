// Component imports
import GamesMenuItem from "./GamesMenuItem";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameList, useGameTag } from "@/context";

export default function GamesMenuList({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const theme = useTheme();

    const gameTag = useGameTag();
    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    if (gameTag) {
        const index = games.findIndex((game) => game.tag === gameTag);
        index > -1 && games.unshift(games.splice(index, 1)[0]);
    }

    return (
        <Card
            sx={{
                border: {
                    xs: gameTag ? `1px solid ${theme.border.color.primary}` : 0,
                    sm: 0,
                },
                borderRadius: "4px",
            }}
        >
            <Text
                weight="highlight"
                sx={{
                    display: { xs: !gameTag ? "block" : "none", sm: "none" },
                    px: 1,
                    pb: 1,
                }}
            >
                Games
            </Text>
            <Stack spacing={0.5}>
                {games.map((game, index) => (
                    <GamesMenuItem
                        key={index}
                        game={game}
                        handleClose={handleClose}
                    />
                ))}
            </Stack>
        </Card>
    );
}
