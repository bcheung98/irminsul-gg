import { Version } from "./common";

interface UmaVersion extends Version {
    id: number;
    startJP: string;
    endJP: string;
}

export interface UmaVersionInfo extends UmaVersion {
    rateUps: number[];
    currentVersion?: boolean;
    futureVersion?: boolean;
}

export interface UmaBanner extends UmaVersion {
    rateUps: number[];
}

export interface UmaItemData {
    id: number;
    name: string;
    title: string;
}
