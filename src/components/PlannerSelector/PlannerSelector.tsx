import { useState } from "react";

// Component imports
import PlannerSelectorPopup from "./PlannerSelectorPopup";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Helper imports
import { useGameTag } from "@/context";
import { categories } from "@/data/categories";
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerItemData, PlannerType } from "@/types/planner";
import type { SvgIconOwnProps } from "@mui/material/SvgIcon";

export default function PlannerSelector({ type }: { type: PlannerType }) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => setSearchOpen(true);
    const handleSearchClose = () => setSearchOpen(false);

    const store = usePlannerStore();

    const items = store[`${game}/items`];

    const handleSelect = (item: PlannerItemData | null) => {
        const newValues = [...items];
        if (item) {
            newValues.unshift(item);
        }
        usePlannerStore.setState(() => ({
            [`${game}/items`]: newValues,
        }));
        setSearchOpen(false);
    };

    const iconProps: SvgIconOwnProps = {
        sx: {
            color: theme.text.primary,
            fontSize: {
                xs: "16px",
                sm: "18px",
            },
        },
    };

    const categoryLabel = categories[`${game}/${type}`].slice(0, -1);

    return (
        <>
            <Button onClick={handleSearchOpen} variant="contained" color="info">
                <TextLabel
                    icon={<AddIcon {...iconProps} />}
                    title={`Add ${categoryLabel}`}
                    titleProps={{ variant: "subtitle2" }}
                />
            </Button>
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
