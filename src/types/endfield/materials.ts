import { Materials } from "../materials";

export type EndfieldMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "crown" // Mark of Perserverance
    | "disk" // Disks for operator promotion
    | "fungi" // Fungi for operator promotion
    | "rare" // Rare materials for various upgrades
    | "level"
    | "skillA"
    | "skillB"
    | "prism" // Prism for operator skill upgrades
    | "plant" // Plant for operator skill upgrades
    | "dice" // Dice for weapon tuning
    | "mineral"; // Mineral for weapon tuning Level 4

export type EndfieldMaterials = {
    [Category in EndfieldMaterialCategory as Category]: string;
};

export type EndfieldCharacterMaterials =
    | Materials
    | Required<
          Pick<
              EndfieldMaterials,
              "level" | "fungi" | "skillA" | "skillB" | "plant"
          >
      >;

export type EndfieldWeaponMaterials =
    | Materials
    | Required<Pick<EndfieldMaterials, "level" | "mineral">>;
