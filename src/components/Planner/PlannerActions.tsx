// Component imports
import PlannerSelector from "../PlannerSelector/PlannerSelector";
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

export default function PlannerActions() {
    const theme = useTheme();

    return (
        <FlexBox spacing={2} wrap>
            <PlannerSelector type="characters" />
            <PlannerSelector type="weapons" />
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
    );
}
