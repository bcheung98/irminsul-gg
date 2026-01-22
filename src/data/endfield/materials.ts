import { Material } from "@/types/materials";
import { fungiMaterials } from "./materials/fungiMaterials";
import { plantMaterials } from "./materials/plantMaterials";
import { mineralMaterials } from "./materials/mineralMaterials";
import { rareMaterials } from "./materials/rareMaterials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";

const otherMaterials: Material[] = [
    {
        id: "item_gold",
        category: "credits",
        name: "T-Creds",
        tag: "T-Creds",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "item_char_skill_crown",
        category: "crown",
        name: "Mark of Perseverance",
        tag: "Crown",
        rarity: 5,
        release: { version: "1.0" },
    },
];

const disks: Material[] = [
    {
        id: "item_char_break_stage_1_2",
        category: "disk",
        name: "Protodisk",
        tag: "Disk1",
        rarity: 3,
        release: { version: "1.0" },
    },
    {
        id: "item_char_break_stage_3_4",
        category: "disk",
        name: "Protoset",
        tag: "Disk2",
        rarity: 4,
        release: { version: "1.0" },
    },
];

const prisms: Material[] = [
    {
        id: "item_char_skill_level_1_6",
        category: "prism",
        name: "Protoprism",
        tag: "Prism1",
        rarity: 3,
        release: { version: "1.0" },
    },
    {
        id: "item_char_skill_level_7_12",
        category: "prism",
        name: "Protohedron",
        tag: "Prism2",
        rarity: 4,
        release: { version: "1.0" },
    },
];

const dice: Material[] = [
    {
        id: "item_weapon_break_low",
        category: "dice",
        name: "Cast Die",
        tag: "Dice1",
        rarity: 3,
        release: { version: "1.0" },
    },
    {
        id: "item_weapon_break_high",
        category: "dice",
        name: "Heavy Cast Die",
        tag: "Dice2",
        rarity: 4,
        release: { version: "1.0" },
    },
];

export const endfieldMaterials: Material[] = [
    disks,
    prisms,
    dice,
    fungiMaterials,
    plantMaterials,
    mineralMaterials,
    rareMaterials,
    characterXPMaterials,
    weaponXPMaterials,
    otherMaterials,
].flat();
