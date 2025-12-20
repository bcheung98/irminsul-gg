import { Materials } from "../materials";

export type ZZZMaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "boss"
    | "weekly"
    | "crown"
    | "characterLevel"
    | "characterSkill"
    | "weaponLevel";

export type ZZZMaterials = {
    [Category in ZZZMaterialCategory as Category]: string | number;
};

export type ZZZCharacterMaterials =
    | Materials
    | Required<Pick<ZZZMaterials, "boss" | "weekly">>;
