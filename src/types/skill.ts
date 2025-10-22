export interface Skill {
    name: string;
    description: string;
    tag?: string;
    splash?: string;
    icon?: string;
    showIcon?: boolean;
    scaling?: string[][];
}

export interface CharacterSkills {
    [key: string]: Skill | undefined;
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
