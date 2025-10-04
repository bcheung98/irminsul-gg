import { styled, Typography, TypographyProps } from "@mui/material";

export const Text = styled((props: TypographyProps) => (
    <Typography variant="body1" {...props} />
))<TypographyProps>(({ theme }) => ({
    color: theme.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.font.weight.primary,
}));
