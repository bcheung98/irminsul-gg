import { PlannerItemData, PlannerType } from "@/types/planner";
import { TypographyProps } from "@mui/material/Typography";

export interface PlannerCardProps {
    item: PlannerItemData;
    type: PlannerType;
    chipColor?: string;
    textVariant?: TypographyProps["variant"];
}

export interface PlannerCardRootProps extends PlannerCardProps {
    children?: React.ReactNode;
}

export interface PlannerCardHeaderProps extends PlannerCardProps {
    href?: string;
}
