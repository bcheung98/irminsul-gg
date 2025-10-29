import { Version } from "./version";

export interface Materials {
    [material: string]: string | number;
}

export interface Material {
    id: number;
    name: string;
    displayName?: string;
    tag?: string;
    category: string;
    rarity?: number;
    source?: string;
    release: Version;
    imgURL?: string;
}
