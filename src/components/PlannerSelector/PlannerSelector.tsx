import { useState } from "react";

// Component imports
import PlannerSelectorPopup from "./PlannerSelectorPopup";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { SvgIconOwnProps } from "@mui/material/SvgIcon";

// Helper imports
import { useGameTag } from "@/context";
import { categories } from "@/data/categories";
import { usePlannerStore } from "@/stores";

// Type imports
import { GameNoUma } from "@/types";
import { PlannerItemData, PlannerType } from "@/types/planner";

export default function PlannerSelector({ type }: { type: PlannerType }) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => setSearchOpen(true);
    const handleSearchClose = () => setSearchOpen(false);

    const store = usePlannerStore();

    const items = store[`${game}/items`];

    const handleSelect = (item: PlannerItemData) => {
        const newValues = [...items];
        newValues.push(item);
        usePlannerStore.setState(() => ({
            [`${game}/items`]: newValues,
        }));
        setSearchOpen(false);
    };

    const iconProps: SvgIconOwnProps = {
        fontSize: "small",
        sx: { color: theme.text.primary },
    };

    return (
        <>
            <Button onClick={handleSearchOpen} variant="contained" color="info">
                <TextLabel
                    icon={<AddIcon {...iconProps} />}
                    title={`Add ${categories[`${game}/${type}`].slice(0, -1)}`}
                    titleProps={{ variant: "subtitle2" }}
                />
            </Button>
            <PlannerSelectorPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                handleSelect={handleSelect}
                type={type}
            />
        </>
    );
}
