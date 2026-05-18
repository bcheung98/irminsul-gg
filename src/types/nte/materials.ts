import { Materials } from "../materials";

export type NTEMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weekly"
    | "city"
    | "skill"
    | "weapon"
    | "common";

export type NTEMaterials = {
    [Category in NTEMaterialCategory as Category]: string | number;
};

export type NTECharacterMaterials =
    | Materials
    | Required<
          Pick<NTEMaterials, "skill" | "common" | "city" | "boss" | "weekly">
      >;
export type NTEWeaponMaterials = Required<
    Pick<NTEMaterials, "weapon" | "common">
>;
