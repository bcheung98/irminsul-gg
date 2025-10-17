import { Material } from "@/types/materials";
import { bossMaterials } from "./materials/bossMaterials";
import { commonMaterials } from "./materials/commonMaterials";
import { eliteMaterials } from "./materials/eliteMaterials";
import { gemstones } from "./materials/gemstones";
import { localMaterials } from "./materials/localMaterials";
import { talentMaterials } from "./materials/talentMaterials";
import { weaponAscensionMaterials } from "./materials/weaponAscensionMaterials";
import { weeklyBossMaterials } from "./materials/weeklyBossMaterials";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "./materials/xpMaterials";

export const genshinMaterials: Material[] = [
    bossMaterials,
    commonMaterials,
    eliteMaterials,
    gemstones,
    localMaterials,
    talentMaterials,
    weaponAscensionMaterials,
    weeklyBossMaterials,
    characterXPMaterials,
    weaponXPMaterials,
].flat();
