import { Skill } from "./skill";

export interface WeaponStats {
    atk: number | string;
    subStat: string;
    passive?: Skill;
}
