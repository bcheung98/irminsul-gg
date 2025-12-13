import { Material } from "@/types/materials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";
import { characterLevelMaterials } from "./materials/characterLevelMaterials";
import { characterSkillMaterials } from "./materials/characterSkillMaterials";
import { weaponLevelMaterials } from "./materials/weaponLevelMaterialas";
import { bossMaterials } from "./materials/bossMaterials";
import { weeklyBossMaterials } from "./materials/weeklyBossMaterials";

const otherMaterials: Material[] = [
    {
        id: 10,
        category: "credits",
        name: "Denny",
        tag: "Denny",
        rarity: 3,
        release: { version: "1.0" },
    },
    {
        id: 100941,
        category: "crown",
        name: "Hamster Cage Pass",
        tag: "Crown",
        rarity: 5,
        release: { version: "1.0" },
    },
];

export const zzzMaterials: Material[] = [
    characterLevelMaterials,
    characterSkillMaterials,
    bossMaterials,
    weeklyBossMaterials,
    weaponLevelMaterials,
    characterXPMaterials,
    weaponXPMaterials,
    otherMaterials,
].flat();
