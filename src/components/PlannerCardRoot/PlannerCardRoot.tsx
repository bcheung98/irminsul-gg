// Component imports
import PlannerCardHeader from "./PlannerCardHeader";
import PlannerCardActions from "./PlannerCardActions";
import ContentBox from "@/components/ContentBox";
import Dropdown from "@/components/Dropdown";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Type imports
import { PlannerCardRootProps } from "./PlannerCardRoot.types";

export default function PlannerCardRoot(props: PlannerCardRootProps) {
    const { children, item } = props;

    return (
        <ContentBox
            header={
                <PlannerCardHeader
                    {...props}
                    textVariant="h6"
                    href={item.url}
                />
            }
            actions={<PlannerCardActions {...props} />}
        >
            <Stack spacing={2} divider={<Divider />}>
                <div>{children}</div>
                <Dropdown title="Materials Required"></Dropdown>
            </Stack>
        </ContentBox>
    );
}
