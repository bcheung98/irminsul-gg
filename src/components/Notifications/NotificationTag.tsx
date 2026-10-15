// Component imports
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { gameNames, games } from "@/data/games";
import { getContrastText } from "@/utils/getContrastText";

// Type imports
import type { Game } from "@/types";

export default function NotificationTag({
    tag = "Site Updates",
}: {
    tag?: string;
}) {
    const theme = useTheme();

    const { title, backgroundColor } = (() => {
        if (gameNames.some((game) => tag.includes(game))) {
            const gameTag = tag.split("-")[0] as Game;
            const game = games[gameTag];

            return {
                title: game.shortName,
                backgroundColor: game.color,
            };
        }

        return {
            title: "Site Updates",
            backgroundColor: theme.palette.info.main,
        };
    })();

    return (
        <InfoChip
            title={title}
            titleProps={{
                variant: "body3",
                color: getContrastText(theme.text.page, backgroundColor),
            }}
            chipProps={{
                padding: "0 12px",
                height: "20px",
                background: backgroundColor,
            }}
        />
    );
}
