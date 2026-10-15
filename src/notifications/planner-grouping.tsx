// Component imports
import { SubHeader, DescriptionSmall } from "@/components/Blog";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// Helper imports
import Color from "@/utils/colors";

export default function PlannerGroupingNotification() {
    const theme = useTheme();

    const cardStyles = {
        p: 2,
        borderRadius: theme.contentBox.border.radius,
        border: `1px solid ${theme.palette.info.main}`,
        backgroundColor: new Color(theme.palette.info.main)
            .alpha(0.5)
            .darken(0.5)
            .toString(),
    };

    return (
        <Stack spacing={2}>
            <Card sx={cardStyles}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <SubHeader>Planner Grouping</SubHeader>
                        <DescriptionSmall>
                            You can now organize your planner items into
                            different groups. If you're working on multiple
                            teams, this allows you to easily track which
                            materials are needed only for a certain team.
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
            <Card sx={cardStyles}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <SubHeader>Completed Materials</SubHeader>
                        <DescriptionSmall>
                            Materials in the Total Cost section can now be
                            clicked on to be marked as completed. This will gray
                            out the material, making it easier to see which
                            materials you have finished collecting, and which
                            ones you still need to work on.
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
            <Card sx={cardStyles}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <SubHeader>Materials List View</SubHeader>
                        <DescriptionSmall>
                            The planner now includes an alternative list view
                            for required materials. You can change this setting
                            from the menu at the top right of the Total Cost
                            container (the three dots).
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}
