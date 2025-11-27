// Component imports
import PlannerSelector from "@/components/PlannerSelector";
import PlannerSorter from "@/components/PlannerSorter";
import FlexBox from "@/components/FlexBox";

export default function PlannerActions() {
    return (
        <FlexBox spacing={2} wrap>
            <PlannerSelector type="characters" />
            <PlannerSelector type="weapons" />
            <PlannerSorter />
        </FlexBox>
    );
}
