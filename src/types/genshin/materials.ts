import { Materials } from "../materials";

export type GenshinMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weeklyBoss"
    | "crown"
    | "gemstone"
    | "local"
    | "talentBook"
    | "common"
    | "weaponAscension"
    | "elite";

export type GenshinMaterials = {
    [Category in GenshinMaterialCategory as Category]: string | number;
};

export type GenshinCharacterMaterials =
    | Materials
    | Required<
          Pick<
              GenshinMaterials,
              | "talentBook"
              | "common"
              | "local"
              | "boss"
              | "weeklyBoss"
          >
      >;
export type GenshinWeaponMaterials = Required<
    Pick<GenshinMaterials, "weaponAscension" | "elite" | "common">
>;
