// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid, { GridProps } from "@mui/material/Grid";

interface SkillCardProps extends GridProps {
    backgroundColor?: string;
}

export default function SkillCard({
    children,
    size,
    backgroundColor,
}: SkillCardProps) {
    const theme = useTheme();

    return (
        <Grid
            size={size || { xs: 12, md: 6 }}
            sx={{
                p: 2,
                backgroundColor: backgroundColor || theme.background(0, "dark"),
                borderRadius: theme.contentBox.border.radius,
                maxHeight: "640px",
                overflowY: "auto",
                scrollbarWidth: "thin",
            }}
        >
            {children}
        </Grid>
    );
}
