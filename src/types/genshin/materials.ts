import { Materials } from "../materials";

export type GenshinMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "bossMat"
    | "weeklyBossMat"
    | "crown"
    | "gemstone"
    | "localMat"
    | "talentBook"
    | "commonMat"
    | "weaponAscensionMat"
    | "eliteMat";

export type GenshinMaterials = {
    [Category in GenshinMaterialCategory as Category]: string | number;
};

export type GenshinCharacterMaterials =
    | Materials
    | Required<
          Pick<
              GenshinMaterials,
              | "talentBook"
              | "commonMat"
              | "localMat"
              | "bossMat"
              | "weeklyBossMat"
              | "gemstone"
          >
      >;
export type GenshinWeaponMaterials = Required<
    Pick<GenshinMaterials, "weaponAscensionMat" | "eliteMat" | "commonMat">
>;
