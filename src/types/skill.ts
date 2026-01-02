export interface Skill {
    name: string;
    description: string;
    tag?: string;
    splash?: string;
    icon?: string | null;
    scaling?: string[][];
    version?: SkillVersion;
    index?: number;
}

export interface CharacterSkillsList {
    [key: string]: Skill[] | undefined;
}

export interface SkillKeyword {
    tag: string;
    name?: string;
    type?: string;
    icon?: string;
    cost?: string;
    description: string;
}

export interface SkillVersion {
    value: string;
    label: string;
}
