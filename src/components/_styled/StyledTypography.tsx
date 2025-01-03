import { styled, Typography, TypographyProps } from "@mui/material";

export const Text = styled((props: TypographyProps) => (
    <Typography variant="body1" {...props} />
))<TypographyProps>(({ theme }) => ({
    color: theme.text.primary,
    fontFamily: theme.font.main.family,
    fontWeight: theme.font.main.weight,
}));

export const TextStyled = styled((props: TypographyProps) => (
    <Typography variant="body1-styled" {...props} />
))(({ theme }) => ({
    color: theme.text.primary,
    fontFamily: theme.font.styled.family,
    fontWeight: theme.font.styled.weight,
}));
