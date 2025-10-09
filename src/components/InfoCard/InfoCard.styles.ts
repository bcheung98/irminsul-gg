import { CSSProperties, SxProps, Theme } from "@mui/material/styles";
import { getRarityColor } from "@/app/(games)/genshin/_helpers/rarityColors";

interface InfoCardStylesProps {
    game: string;
    type: string;
    border: {
        width: string | number;
        color: string;
        radius: string | number;
    };
    backgroundColor: string;
    rarity: number;
    imgSize: string;
}

export const infoCardStyles = ({
    game,
    type,
    border,
    backgroundColor,
    rarity,
    imgSize,
}: InfoCardStylesProps) => ({
    root: (): SxProps<Theme> => (theme) => ({
        position: "relative",
        overflow: "visible",
        width: imgSize,
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
        width: imgSize,
        backgroundColor:
            type === "characters" ? backgroundColor : "transparent",
        backgroundImage:
            type === "characters"
                ? null
                : `url(https://assets.irminsul.gg/${game}/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    }),
    textContainer: (): SxProps => () => ({
        p: "8px",
        borderTop: `calc(${imgSize} / 20) solid ${getRarityColor(rarity)}`,
    }),
    text: (): SxProps<Theme> => (theme) => ({
        color: theme.infoCard.color.primary,
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
    badgeIcon: (): CSSProperties => ({
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "24px",
        minHeight: "24px",
        padding: "4px",
    }),
});
