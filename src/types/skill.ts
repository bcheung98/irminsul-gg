export interface Skill {
    name: string;
    description: string;
    tag?: string;
    splash?: string;
    icon?: string | null;
    scaling?: string[][];
    version?: {
        value: string;
        label: string;
    };
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
    description: string;
}
