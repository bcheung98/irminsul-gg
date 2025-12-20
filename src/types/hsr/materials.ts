import { Materials } from "../materials";

export type HSRMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weekly"
    | "crown"
    | "calyx"
    | "common";

export type HSRMaterials = {
    [Category in HSRMaterialCategory as Category]: string | number;
};

export type HSRCharacterMaterials =
    | Materials
    | Required<Pick<HSRMaterials, "calyx" | "common" | "boss" | "weekly">>;
export type HSRWeaponMaterials = Required<
    Pick<HSRMaterials, "calyx" | "common">
>;
