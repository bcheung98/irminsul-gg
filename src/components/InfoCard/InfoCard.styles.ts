import { CSSProperties, SxProps, Theme } from "@mui/material/styles";
import { useRarityColors } from "@/helpers/rarityColors";
import { Game } from "@/types";

interface InfoCardStylesProps {
    game: Game;
    type: string;
    border: {
        width: string | number;
        color: string;
        radius: string | number;
    };
    backgroundColor: string;
    rarity: number;
    imgSize: string;
    variant?: string;
}

export const infoCardStyles = ({
    game,
    type,
    border,
    backgroundColor,
    rarity,
    imgSize,
    variant,
}: InfoCardStylesProps) => ({
    root: (): SxProps<Theme> => (theme) => ({
        position: "relative",
        overflow: "visible",
        width: variant !== "material-card" ? imgSize : "auto",
        borderRadius: border.radius,
        background: `linear-gradient(to bottom, transparent, ${theme.infoCard.backgroundColor.main})`,
    }),
    card: (): SxProps => () => ({
        borderStyle: "solid",
        borderWidth: border.width,
        borderColor: border.color,
        borderRadius: border.radius,
        backgroundColor: "transparent",
    }),
    imageContainer: (): SxProps => () => ({
        display: "flex",
        overflow: "clip",
        width:
            variant !== "material-card" ? imgSize : `calc(${imgSize} * 8 /3)`,
        backgroundColor:
            type === "characters" ? backgroundColor : "transparent",
        backgroundImage:
            variant !== "material-card" && type === "characters"
                ? null
                : `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
    }),
    textContainer: (): SxProps => () => ({
        p: "8px",
        borderTop: `calc(${imgSize} / 20) solid ${useRarityColors()[game](
            rarity
        )}`,
    }),
    text: (): SxProps<Theme> => (theme) => ({
        color: theme.infoCard.color.primary,
        fontWeight: theme.font.weight.highlight,
        textAlign: "center",
    }),
    badgeContainer:
        (side: "left" | "right"): SxProps<Theme> =>
        (theme) => ({
            position: "absolute",
            zIndex: 5,
            top: side === "left" ? -4 : -2,
            left: side === "left" ? -12 : null,
            right: side === "right" ? 2 : null,
            backgroundColor: theme.infoCard.backgroundColor.main,
            borderRadius: "16px",
        }),
    badgeIcon: (matches = true): CSSProperties => ({
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: matches ? "28px" : "24px",
        minHeight: matches ? "28px" : "24px",
        padding: "4px",
    }),
});
