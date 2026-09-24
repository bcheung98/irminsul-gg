// MUI imports
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { usePlannerStore } from "@/stores";
import { getCompletedMaterialKey } from "@/stores/usePlannerStore";

// Type imports
import type { GameNoUma } from "@/types";

export default function MaterialCardButton({
    children,
    game,
    category,
    materialID,
}: {
    children: React.ReactNode;
    game: GameNoUma;
    category: string;
    materialID: string | number;
}) {
    const key = getCompletedMaterialKey(category, `${materialID}`);

    const selected = usePlannerStore((state) =>
        state[`${game}/completed`].includes(key),
    );

    const toggleCompleted = usePlannerStore(
        (state) => state[`${game}/toggleCompleted`],
    );

    const handleClick = () => {
        toggleCompleted(key);
    };

    return (
        <ButtonBase
            disableRipple
            disableTouchRipple
            onClick={handleClick}
            sx={{ opacity: selected ? 0.35 : 1, transition: "opacity 0.15s" }}
        >
            {children}
        </ButtonBase>
    );
}
