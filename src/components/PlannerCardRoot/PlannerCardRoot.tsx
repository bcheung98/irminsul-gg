import { useState } from "react";

// Component imports
import PlannerCardHeader from "./PlannerCardHeader";
import PlannerCardActions from "./PlannerCardActions";
import GenshinPlannerCard from "@/components/_genshin/PlannerCard";
import ContentBox from "@/components/ContentBox";
import Dropdown from "@/components/Dropdown";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";
import {
    PlannerCardContext,
    PlannerCardModeContext,
} from "./PlannerCard.utils";
import { usePlannerData } from "@/components/Planner/Planner.utils";

// Type imports
import { PlannerCardProps } from "./PlannerCardRoot.types";
import { GameData, GameNoUma } from "@/types";
import { CardMode, PlannerItemData } from "@/types/planner";

export default function PlannerCardRoot(props: PlannerCardProps) {
    const { characters, weapons } = usePlannerData();
    const game = useGameTag() as GameNoUma;

    // Updates the item's data in case the names or materials change
    function validateItem(inputItem: PlannerItemData) {
        const item = [...characters, ...weapons].find(
            (item) => item.id === inputItem.id
        );
        if (!item) throw new Error("Item not found");
        inputItem.name = item.name;
        inputItem.displayName = item.displayName;
        inputItem.materials = item.materials;
        return inputItem;
    }
    const item = validateItem(props.item);

    const store = usePlannerStore();
    const hiddenItems = store[`${game}/hidden`];
    const hidden = hiddenItems.includes(item.id);

    const [mode, setMode] = useState<CardMode>("view");
    const handleModeChange = () => {
        if (mode === "view") {
            setMode("edit");
        } else {
            setMode("view");
        }
    };

    return (
        <PlannerCardContext value={item}>
            <ContentBox
                header={
                    <PlannerCardHeader
                        {...props}
                        textVariant="h6"
                        href={item.url}
                    />
                }
                actions={
                    <PlannerCardActions
                        {...props}
                        mode={mode}
                        handleModeChange={handleModeChange}
                    />
                }
            >
                <PlannerCardModeContext value={mode}>
                    <Stack
                        spacing={2}
                        divider={<Divider />}
                        sx={{ opacity: hidden ? 0.5 : 1, px: { xs: 0, lg: 2 } }}
                    >
                        {components[game]}
                        <Dropdown
                            title="Materials Required"
                            defaultOpen
                        ></Dropdown>
                    </Stack>
                </PlannerCardModeContext>
            </ContentBox>
        </PlannerCardContext>
    );
}

const components: GameData<React.ReactNode> = {
    genshin: <GenshinPlannerCard />,
    hsr: <div></div>,
    wuwa: <div></div>,
    zzz: <div></div>,
    uma: undefined,
};
