import { BaseData } from "@/types";
import { BannerOption, BannerType } from "@/types/banner";

export function createBannerData<
    T extends BannerOption,
    U extends BannerOption
>({
    id,
    name,
    tag,
    characters,
    weapons,
}: {
    id?: number;
    name?: string;
    tag: BannerType;
    characters: T[];
    weapons: U[];
}) {
    let data: BannerOption = {
        id: -1,
        name: "TBA",
        displayName: "TBA",
        rarity: 3,
        weaponType: "",
        url: "",
    };
    switch (tag) {
        case "character":
            const character = characters.find(
                (char) => char.name === name || char.id === id
            );
            if (character) {
                data.id = character.id;
                data.name = character.name;
                data.displayName = character.fullName || character.displayName;
                data.rarity = character.rarity;
                data.element = character.element;
                data.weaponType = character.weaponType;
                data.url = character.url;
            }
        case "weapon":
        case "chronicled":
            const weapon = weapons.find(
                (wep) => wep.name === name || wep.id === id
            );
            if (weapon) {
                data.id = weapon.id;
                data.name = weapon.name;
                data.displayName = weapon.displayName;
                data.rarity = weapon.rarity;
                data.weaponType = weapon.weaponType;
                data.url = weapon.url;
            }
    }
    return data;
}
