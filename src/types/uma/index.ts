import {
    aptitude,
    raceStages,
    ranks,
    rarities,
    skillRarities,
    specialties,
} from "@/data/uma/common";
import { UmaCharacter } from "./character";
import { UmaSupport } from "./support";

export type UmaRarity = (typeof rarities)[number];
export type UmaSkillRarity = (typeof skillRarities)[number];
export type UmaRank = (typeof ranks)[number];
export type UmaStat = Exclude<UmaSpecialty, "Pal" | "Group">;
export type UmaSpecialty = (typeof specialties)[number];

export type UmaAptitude = (typeof aptitude)[number];
export type UmaRaceStage = (typeof raceStages)[number];

export type { UmaCharacter, UmaSupport };
