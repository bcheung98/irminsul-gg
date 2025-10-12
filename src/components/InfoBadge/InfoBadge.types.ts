import { AttributeData } from "@/types/_common";
import { SxProps, Theme, CSSProperties } from "@mui/material/styles";

export interface InfoBadgeProps {
    data: AttributeData;
    game: string;
    styles: {
        root: SxProps<Theme>;
        icon: CSSProperties;
    };
    spacing?: number;
    orientation?: "column" | "row";
}
