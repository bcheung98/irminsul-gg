export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
    gameVersion: string;
    color: string;
    urls: WebsiteURLInfo;
}

export interface WebsiteURLInfo {
    [key: string]: URLInfo;
}

export interface URLInfo {
    icon: string;
    href: string;
}

export interface WebsiteColorInfo {
    [game: string]: string;
}
