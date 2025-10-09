import { SxProps, Theme, CSSProperties } from "@mui/material/styles";

export interface InfoBadgeProps {
    data: InfoBadgeData;
    game: string;
    styles: {
        root: SxProps<Theme>;
        icon: CSSProperties;
    };
    spacing?: number;
    orientation?: "column" | "row";
}

export type InfoBadgeDataKey = keyof InfoBadgeData;

export interface InfoBadgeData {
    element?: string;
    weapon?: string;
    weaponType?: string;
    subStat?: string;
    path?: string;
    specialty?: string;
    cost?: string;
}
