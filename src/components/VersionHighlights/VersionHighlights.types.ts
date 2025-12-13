import { BaseDataWithRelease } from "@/types";

export interface VersionItemData extends BaseDataWithRelease {
    [key: string]: any;
}

export interface VersionHighlightsProps {
    characters: VersionItemData[];
    weapons: VersionItemData[];
    equipment: VersionItemData[];
    bangboos?: VersionItemData[];
}
