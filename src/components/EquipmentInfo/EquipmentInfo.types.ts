import type { Equipment, SetPieces } from "@/types/equipment";

export interface EquipmentInfo {
    equipment: Equipment;
}

export interface EquipmentTabsListProps {
    pieces: SetPieces[];
    tabValue: number;
    handleTabChange: (_: React.BaseSyntheticEvent, newValue: number) => void;
}

export interface EquipmentTabProps extends EquipmentInfo {
    piece: SetPieces;
    tabValue: number;
    index: number;
}

export interface EquipmentTabImageProps extends EquipmentInfo {
    imageUrl: string;
    padding?: string | number;
}
