import { EventRewards } from "./event";

export interface Race {
    id: string;
    raceID: number;
    name: string;
    nameJP: string;
    year: string;
    month: string;
    half: number;
    grade: string;
    distance: string;
    terrain: string;
    direction: string;
}

export interface Racetrack {
    [key: number]: string;
}

export interface RaceSeries {
    [key: string]: { name: string; races: string[] };
}

export interface RaceTypeOption {
    label: string;
    value: string;
}

export interface RaceRewardEntry {
    placement: [number, number] | null;
    rewards: EventRewards[];
    bond?: number | null;
}

export interface RaceRewardTable {
    base: RaceRewardEntry[];
    postTracenKen?: RaceRewardEntry[];
    fixed?: boolean;
}

export type PlacementRange = [number, number];
