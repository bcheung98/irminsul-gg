import { Version } from "./version";

export interface Materials {
    [material: string]: string | number;
}

export interface Material {
    id: number;
    name: string;
    tag?: string;
    category: string;
    rarity?: number;
    source?: string;
    release: Version;
}
