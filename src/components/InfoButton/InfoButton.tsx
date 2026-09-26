import Link from "next/link";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Helper imports
import { games, gameNames } from "@/data/games";
import { useGameTag } from "@/context";
import { infoButtonStyles } from "./InfoButton.styles";

// Type imports
import type { Game } from "@/types";
import type { InfoButtonProps } from "./InfoButton.types";

export default function InfoButton({
    children,
    href,
    title,
    size = "medium",
    game,
    color,
    hoverAdjust = -0.15,
    hoverBackgroundColor,
    icons = {
        end: ChevronRightIcon,
    },
    spacing = 1,
    sx,
    ...props
}: InfoButtonProps) {
    const theme = useTheme();

    const gameTag = useGameTag();

    const backgroundColor = (() => {
        if (color) return color;
        if (typeof game === "string" && isGame(game)) return games[game].color;
        if (game === true && isGame(gameTag)) return games[gameTag].color;
        return theme.palette.info.main;
    })();

    const styles = infoButtonStyles({
        size,
        backgroundColor,
        hoverBackgroundColor,
        hoverAdjust,
        icons: !!icons,
    });

    const buttonStyles = [styles.root, ...(Array.isArray(sx) ? sx : [sx])];

    const label = (
        <Text
            variant={size === "medium" ? "body2" : "subtitle2"}
            weight="highlight"
            sx={{ color: "inherit" }}
        >
            {title}
        </Text>
    );

    const content = children ? (
        children
    ) : (
        <FlexBox spacing={spacing} sx={{ justifyContent: "space-between" }}>
            {icons && icons.start !== undefined && (
                <icons.start sx={styles.icon} />
            )}
            {label}
            {icons && icons.end !== undefined && <icons.end sx={styles.icon} />}
        </FlexBox>
    );

    const params = {
        disableRipple: !!href,
        disableTouchRipple: !!href,
        ...props,
    };

    return href ? (
        <ButtonBase
            LinkComponent={Link}
            href={href}
            sx={buttonStyles}
            {...params}
        >
            {content}
        </ButtonBase>
    ) : (
        <ButtonBase sx={buttonStyles} {...params}>
            {content}
        </ButtonBase>
    );
}

function isGame(game?: string): game is Game {
    return gameNames.includes(game as Game);
}
