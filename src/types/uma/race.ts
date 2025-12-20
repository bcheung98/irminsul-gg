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
