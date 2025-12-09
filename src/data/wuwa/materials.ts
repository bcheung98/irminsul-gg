import { Material } from "@/types/materials";
import { forgeryMaterials } from "./materials/forgeryMaterials";
import { commonMaterials } from "./materials/commonMaterials";
import { localMaterials } from "./materials/localMaterials";
import { bossMaterials } from "./materials/bossMaterials";
import { weeklyBossMaterials } from "./materials/weeklyBossMaterials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";

const otherMaterials: Material[] = [
    {
        id: 2,
        category: "credits",
        name: "Shell Credit",
        tag: "Shell Credit",
        rarity: 3,
        release: { version: "1.0" },
    },
];

export const wuwaMaterials: Material[] = [
    forgeryMaterials,
    commonMaterials,
    localMaterials,
    bossMaterials,
    weeklyBossMaterials,
    characterXPMaterials,
    weaponXPMaterials,
    otherMaterials,
].flat();
