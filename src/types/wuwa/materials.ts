import { Materials } from "../materials";

export type WuWaMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weekly"
    | "local"
    | "forgery"
    | "common";

export type WuWaMaterials = {
    [Category in WuWaMaterialCategory as Category]: string | number;
};

export type WuWaCharacterMaterials =
    | Materials
    | Required<
          Pick<
              WuWaMaterials,
              "forgery" | "common" | "local" | "boss" | "weekly"
          >
      >;
export type WuWaWeaponMaterials = Required<
    Pick<WuWaMaterials, "forgery" | "common">
>;
