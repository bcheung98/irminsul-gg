import { Version } from "../version";

export interface NTEDrive {
    id: string;
    name: string;
    displayName: string;
    tag: string;
    tiles: number;
    release: Version;
    url: string;
}
