import { useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import TextLabel from "@/components/TextLabel";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";

// Helper imports
import { useGameList, useGameTag } from "@/context";

// Type imports
import { GameInfo } from "@/types";

export default function GamesMenuItem({
    game,
    handleClose,
}: {
    game: GameInfo;
    handleClose: () => void;
}) {
    const theme = useTheme();

    const pathname = usePathname();
    const gameTag = useGameTag();
    const games = useGameList()
        .filter((game) => game.enabled)
        .sort((a, b) => a.name.localeCompare(b.name));

    const isLinkActive = pathname.includes(game.tag);

    const [hover, setHover] = useState(false);

    if (gameTag) {
        const index = games.findIndex(() => isLinkActive);
        index > -1 && games.unshift(games.splice(index, 1)[0]);
    }

    const rootStyle = {
        position: "relative",
        p: {
            xs: "4px 16px",
            lg: "4px 24px",
        },
        backgroundColor: isLinkActive
            ? theme.drawer.backgroundColor.hover
            : "transparent",
        transition: "background-color 0.25s",
        "&:hover": {
            backgroundColor: theme.drawer.backgroundColor.hover,
        },
    };

    const indicatorStyle = [
        {
            position: "absolute",
            top: 8,
            left: 0,
            width: "4px",
            height: "24px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "transparent",
            borderRadius: "0 16px 16px 0",
            transition: "border 0.25s",
        },
        hover &&
            !isLinkActive && {
                borderColor: game.color,
                borderRadius: "0 8px 8px 0",
            },
        isLinkActive && {
            top: 0,
            height: { xs: "34px", md: "40px" },
            borderColor: game.color,
            borderRadius: "0 8px 8px 0",
        },
        hover &&
            isLinkActive && {
                borderColor: theme.drawer.indicator.hover,
            },
    ];

    return (
        <ButtonBase
            href={`/${game.tag.toLocaleLowerCase()}`}
            sx={{ display: "flex" }}
            LinkComponent={NavLink}
        >
            <Box
                sx={rootStyle}
                onClick={handleClose}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Box sx={indicatorStyle} />
                <TextLabel
                    icon={`${game.tag}/_common/Icon`}
                    iconProps={{ size: 32 }}
                    title={game.name}
                    titleProps={{
                        variant: "subtitle1",
                        color: isLinkActive
                            ? theme.text.selected
                            : theme.text.primary,
                        defaultCursor: "pointer",
                    }}
                    spacing={2}
                />
            </Box>
        </ButtonBase>
    );
}
