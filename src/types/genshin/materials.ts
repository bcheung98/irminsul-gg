import { Materials } from "../materials";

export type GenshinMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weekly"
    | "crown"
    | "gemstone"
    | "local"
    | "talent"
    | "common"
    | "weapon"
    | "elite";

export type GenshinMaterials = {
    [Category in GenshinMaterialCategory as Category]: string | number;
};

export type GenshinCharacterMaterials =
    | Materials
    | Required<
          Pick<
              GenshinMaterials,
              "talent" | "common" | "local" | "boss" | "weekly" | "gemstone"
          >
      >;
export type GenshinWeaponMaterials = Required<
    Pick<GenshinMaterials, "weapon" | "elite" | "common">
>;
