import { Material } from "@/types/materials";
import { bossMaterials } from "./materials/bossMaterials";
import { commonMaterials } from "./materials/commonMaterials";
import { skillMaterials } from "./materials/skillMaterials";
import { weaponMaterials } from "./materials/weaponMaterials";
import { weeklyBossMaterials } from "./materials/weeklyBossMaterials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";

const otherMaterials: Material[] = [
    {
        id: "Gold",
        category: "credits",
        name: "Beetle Coin",
        tag: "Gold",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "Fons",
        category: "credits",
        name: "Fons",
        tag: "Fons",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
    {
        id: "CityAbility_UpMaterial",
        category: "credits",
        name: "Dreamless Seed",
        tag: "Dreamless Seed",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
];

export const nteMaterials: Material[] = [
    bossMaterials,
    commonMaterials,
    skillMaterials,
    weaponMaterials,
    weeklyBossMaterials,
    characterXPMaterials,
    weaponXPMaterials,
    otherMaterials,
].flat();
