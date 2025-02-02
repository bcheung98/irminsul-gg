export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
    gameVersion: string;
    color: string;
    urls: WebsiteURLInfo;
}

export interface WebsiteURLInfo {
    characters: URLInfo;
    weapons: URLInfo;
}

export interface URLInfo {
    icon: string;
    href: string;
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
    currentVersion?: boolean;
    futureVersion?: boolean;
}

export interface Banner extends Version {
    fiveStars: string[];
    fourStars: string[];
}

export type BannerList = Record<string, Partial<Record<string, Banner[]>>>;

export interface EventObject {
    title: string;
    start?: string;
    end?: string;
    extendedProps?: EventObjectExtendedProps;
}

export interface EventSourceObject {
    events: EventObject[];
    tag: string;
}

export interface EventObjectExtendedProps extends Partial<VersionInfo> {
    tag: string;
    color: string;
}
