import type { SxProps, Theme } from "@mui/material/styles";

export const materialCardStyles = (rarity: number, size: number) => ({
    root: ((): SxProps<Theme> => (theme) => ({
        backgroundColor: theme.materialCard.backgroundColor.main,
        width: size,
    }))(),
    imageContainer: ((): SxProps<Theme> => (theme) => {
        const r = theme.materialCard.imageBorder.radius;
        return {
            display: "flex",
            width: size,
            backgroundImage: theme.materialCard.backgroundImage(rarity),
            backgroundSize: "contain",
            borderRadius: `${r}px ${r}px 0 0`,
        };
    })(),
    label: ((): SxProps<Theme> => (theme) => ({
        padding: "4px",
        textAlign: "center",
        backgroundColor: theme.materialCard.backgroundColor.label,
    }))(),
});
