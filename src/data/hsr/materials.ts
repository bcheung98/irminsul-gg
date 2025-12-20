import { Material } from "@/types/materials";
import { bossMaterials } from "./materials/bossMaterials";
import { calyxMaterials } from "./materials/calyxMaterials";
import { commonMaterials } from "./materials/commonMaterials";
import { weeklyBossMaterials } from "./materials/weeklyBossMaterials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";

const otherMaterials: Material[] = [
    {
        id: 2,
        category: "credits",
        name: "Credit",
        tag: "Credit",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: 241,
        category: "crown",
        name: "Tracks of Destiny",
        tag: "Tracks of Destiny",
        rarity: 5,
        release: {
            version: "1.0",
        },
    },
];

export const hsrMaterials: Material[] = [
    bossMaterials,
    calyxMaterials,
    commonMaterials,
    weeklyBossMaterials,
    characterXPMaterials,
    weaponXPMaterials,
    otherMaterials,
].flat();
