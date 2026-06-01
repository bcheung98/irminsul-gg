// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { combatRoles as tags } from "@/data/nte/combatRoles";

// Type imports
import { AttributeData } from "@/types";

export default function CharacterCombatRoles({ combatRoles }: AttributeData) {
    const theme = useTheme();

    if (!combatRoles) return <></>;

    function CombatRole({ role }: { role: string; label?: boolean }) {
        const tag = tags.find((tag) => tag.name === role);
        if (!tag) return null;

        return (
            <Box
                sx={{
                    border: `2px solid ${tag.color}`,
                    borderRadius: "24px",
                    backgroundColor: theme.palette.tertiary.dark,
                    padding: "4px 16px",
                }}
            >
                <TextLabel
                    icon={tag.icon}
                    iconProps={{ size: 24 }}
                    title={role}
                    titleProps={{ variant: "subtitle2" }}
                />
            </Box>
        );
    }

    return (
        <FlexBox spacing={1}>
            <Grid container spacing={1}>
                {combatRoles.map((role) => (
                    <CombatRole key={role} role={role} />
                ))}
            </Grid>
        </FlexBox>
    );
}
