// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

// Helper imports
import { useGameTag } from "@/context";
import { categories } from "@/data/categories";
import { usePlannerData } from "./Planner.utils";

export default function PlannerActions() {
    const theme = useTheme();

    const game = useGameTag();

    const { characters, weapons } = usePlannerData();

    const title = (type: "characters" | "weapons") =>
        `Add ${categories[`${game}/${type}`].slice(0, -1)}`;

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, xl: 6 }}>
                <Card
                    sx={{
                        p: 2,
                        borderRadius: theme.contentBox.border.radius,
                    }}
                >
                    <FlexBox spacing={2} wrap>
                        <Button variant="contained" color="info">
                            <TextLabel
                                icon={
                                    <AddIcon
                                        fontSize="small"
                                        sx={{ color: theme.text.primary }}
                                    />
                                }
                                title={title("characters")}
                                titleProps={{ variant: "subtitle2" }}
                            />
                        </Button>
                        <Button variant="contained" color="info">
                            <TextLabel
                                icon={
                                    <AddIcon
                                        fontSize="small"
                                        sx={{ color: theme.text.primary }}
                                    />
                                }
                                title={title("weapons")}
                                titleProps={{ variant: "subtitle2" }}
                            />
                        </Button>
                        <Button variant="contained" color="info">
                            <TextLabel
                                icon={
                                    <LowPriorityIcon
                                        fontSize="small"
                                        sx={{ color: theme.text.primary }}
                                    />
                                }
                                title="Adjust Order"
                                titleProps={{ variant: "subtitle2" }}
                            />
                        </Button>
                    </FlexBox>
                </Card>
            </Grid>
        </Grid>
    );
}
