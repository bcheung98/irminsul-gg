import { VoiceActorData } from ".";

export interface Version {
    version: string;
}

export interface VersionWithDate extends Version {
    date: string;
}

export interface VersionInfo {
    version: string;
    name: string;
}

export interface UmaVersion extends Version {
    global: string;
    jp: string;
}
