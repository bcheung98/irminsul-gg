import { CSSProperties, SxProps, Theme } from "@mui/material/styles";

interface MaterialCardStylesProps {
    rarity: number;
    size: number;
}

export const materialCardStyles = ({
    rarity,
    size,
}: MaterialCardStylesProps) => ({
    root: (): SxProps<Theme> => (theme) => ({
        backgroundColor: theme.materialCard.backgroundColor.main,
        width: size,
    }),
    imageContainer: (theme: Theme): CSSProperties => {
        const r = theme.materialCard.imageBorder.radius;
        return {
            display: "flex",
            width: size,
            backgroundImage: theme.materialCard.backgroundImage(rarity),
            backgroundSize: "contain",
            borderRadius: `${r}px ${r}px 0 0`,
        };
    },
    label:
        (): SxProps<Theme> =>
        (theme): CSSProperties => ({
            padding: "4px",
            textAlign: "center",
            backgroundColor: theme.materialCard.backgroundColor.label,
        }),
});
