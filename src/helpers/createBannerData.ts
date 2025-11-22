import { BannerOption } from "@/types/banner";

export function createBannerData<
    T extends BannerOption,
    U extends BannerOption
>({
    id,
    name = "TBA",
    characters,
    weapons,
}: {
    id?: number;
    name?: string;
    characters: T[];
    weapons: U[];
}) {
    let data: BannerOption = {
        category: "characters",
        id: -1,
        name: name,
        displayName: name,
        rarity: 3,
        weaponType: "",
        url: "",
    };
    const character = characters.find(
        (char) => char.name === name || char.id === id
    );
    const weapon = weapons.find((wep) => wep.name === name || wep.id === id);
    if (character && weapon) {
        console.warn(`Two entries with ID ${id} were found`);
        return data;
    }

    if (character) {
        data.id = character.id;
        data.name = character.name;
        data.displayName = character.fullName || character.displayName;
        data.rarity = character.rarity;
        data.element = character.element;
        data.weaponType = character.weaponType;
        data.url = character.url;
    } else if (weapon) {
        data.category = "weapons";
        data.id = weapon.id;
        data.name = weapon.name;
        data.displayName = weapon.displayName;
        data.rarity = weapon.rarity;
        data.weaponType = weapon.weaponType;
        data.url = weapon.url;
    } else {
        name !== "TBA" && console.warn(`Could not find an entry with ID ${id}`);
    }
    return data;
}
