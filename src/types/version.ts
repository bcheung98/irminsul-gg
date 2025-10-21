import { VoiceActorData } from ".";

export interface Version {
    version: string;
}

export interface VersionWithDate extends Version {
    date: string;
}

export interface UmaVersion extends VoiceActorData {}
