// Component imports
import PlannerCardHeader from "./PlannerCardHeader";
import PlannerCardActions from "./PlannerCardActions";
import ContentBox from "@/components/ContentBox";
import Dropdown from "@/components/Dropdown";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";

// Type imports
import { PlannerCardRootProps } from "./PlannerCardRoot.types";
import { Game } from "@/types";

export default function PlannerCardRoot(props: PlannerCardRootProps) {
    const { children, item } = props;

    const game = useGameTag() as Exclude<Game, "uma">;

    const store = usePlannerStore();
    const hiddenItems = store[`${game}/hidden`];
    const hidden = hiddenItems.includes(item.id);

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
            <Stack
                spacing={2}
                divider={<Divider />}
                sx={{ opacity: hidden ? 0.5 : 1 }}
            >
                <div>{children}</div>
                <Dropdown title="Materials Required"></Dropdown>
            </Stack>
        </ContentBox>
    );
}
