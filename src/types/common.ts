export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
    href: string;
    gameVersion: string;
    imgTransform?: {
        scale?: number;
        translate?: [number, number];
    };
}

export interface Post {
    title: string;
    description: string;
    date: string;
}