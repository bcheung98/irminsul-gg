import { styled, Typography, TypographyProps } from "@mui/material";

export type TextWeight = "primary" | "element" | "highlight" | "home" | number;

interface TextProps extends TypographyProps {
    weight?: TextWeight;
}

const Text = styled((props: TextProps) => (
    <Typography variant="body1" {...props} />
))<TypographyProps>(({ theme, weight = "primary" }) => ({
    color: theme.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: typeof weight === "number" ? weight : theme.font.weight[weight],
}));

export default Text;
