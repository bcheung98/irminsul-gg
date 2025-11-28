import { CardMode, PlannerItemData, PlannerType } from "@/types/planner";
import { TypographyProps } from "@mui/material/Typography";

export interface PlannerCardProps {
    item: PlannerItemData;
    type: PlannerType;
    chipColor?: string;
    textVariant?: TypographyProps["variant"];
}

export interface PlannerCardHeaderProps extends PlannerCardProps {
    href?: string;
}

export interface PlannerCardActionProps extends PlannerCardProps {
    mode: CardMode;
    handleModeChange: () => void;
}
