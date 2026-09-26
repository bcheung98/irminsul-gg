import { useCallback, useState } from "react";

// Component imports
import PlannerSelectorPopup from "./PlannerSelectorPopup";
import InfoButton from "@/components/InfoButton";

// MUI imports
import AddIcon from "@mui/icons-material/Add";

// Helper imports
import { useGameTag } from "@/context";
import { categories } from "@/data/categories";
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerItemData, PlannerType } from "@/types/planner";

export default function PlannerSelector({ type }: { type: PlannerType }) {
    const game = useGameTag() as GameNoUma;

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => setSearchOpen(true);
    const handleSearchClose = () => setSearchOpen(false);

    const handleSelect = useCallback(
        (item: PlannerItemData | null) => {
            if (item) {
                usePlannerStore.setState((state) => ({
                    [`${game}/items`]: [item, ...state[`${game}/items`]],
                }));
            }
            setSearchOpen(false);
        },
        [game],
    );

    const categoryLabel = categories[`${game}/${type}`].slice(0, -1);

    return (
        <>
            <InfoButton
                game
                title={`Add ${categoryLabel}`}
                icons={{ start: AddIcon }}
                onClick={handleSearchOpen}
            />
            <PlannerSelectorPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                handleSelect={handleSelect}
                type={type}
                categoryLabel={categoryLabel}
            />
        </>
    );
}
