import type { BaseDataWithRelease } from "@/types";

export type VersionCategory =
    | "characters"
    | "weapons"
    | "equipment"
    | "bangboos";

export interface VersionItemData extends BaseDataWithRelease {
    [key: string]: any;
}

export interface VersionHighlightsProps {
    characters: VersionItemData[];
    weapons: VersionItemData[];
    equipment: VersionItemData[];
    bangboos?: VersionItemData[];
    supports?: VersionItemData[];
    cards?: VersionItemData[];
}
