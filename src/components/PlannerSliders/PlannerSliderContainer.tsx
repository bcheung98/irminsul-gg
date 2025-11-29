import Grid from "@mui/material/Grid";
import { CardMode } from "@/types/planner";

interface Props {
    children?: React.ReactNode;
    mode: CardMode;
}

export function MainContainer({ children, mode }: Props) {
    return (
        <Grid container rowSpacing={1} columnSpacing={mode === "view" ? 1 : 6}>
            {children}
        </Grid>
    );
}

export function LevelSliderContainer({ children, mode }: Props) {
    return (
        <Grid size={12} sx={{ mb: { xs: mode === "view" ? 1 : 0, md: 1 } }}>
            {children}
        </Grid>
    );
}

export function SkillSliderContainer({ children, mode }: Props) {
    return (
        <Grid size={mode === "view" ? { xs: 6, sm: 3 } : { xs: 12, md: 6 }}>
            {children}
        </Grid>
    );
}
