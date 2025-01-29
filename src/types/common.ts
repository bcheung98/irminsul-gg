export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
    gameVersion: string;
    color: string;
}

export interface WebsiteColorInfo {
    [game: string]: string;
}

export interface Post {
    title: string;
    description: string;
    date: string;
}

interface Version {
    version: string;
    subVersion: string;
    start: string;
    end: string;
}

export interface VersionInfo extends Version {
    characters: string[];
    futureVersion?: boolean;
}

export interface Banner extends Version {
    fiveStars: string[];
    fourStars: string[];
}

export type BannerList = Record<string, Partial<Record<string, Banner[]>>>;

export interface EventObject {
    tag: string;
    title: string;
    start?: string;
    end?: string;
    extendedProps?: {
        characters?: string[];
    };
}

export interface EventSourceObject {
    events: EventObject[];
    tag: string;
    color?: string;
    textColor?: string;
}
