export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
    gameVersion: string;
}

export interface Post {
    title: string;
    description: string;
    date: string;
}

export interface Banner {
    version: string;
    subVersion: string;
    start: string;
    end: string;
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
        fiveStars?: string[];
        fourStars?: string[];
    };
    rrule?: {};
}

export interface EventSourceObject {
    events: EventObject[];
    tag: string;
    color?: string;
    textColor?: string;
}
