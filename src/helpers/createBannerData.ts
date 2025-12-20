import { Banner, BannerOption, BannerProps } from "@/types/banner";

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
        data.displayName = character.displayName || character.name;
        data.rarity = character.rarity;
        data.element = character.element;
        data.weaponType = character.weaponType;
        if (character.outfit) data.outfit = character.outfit;
        data.url = character.url;
    } else if (weapon) {
        data.category = "weapons";
        data.id = weapon.id;
        data.name = weapon.name;
        data.displayName = weapon.displayName || weapon.name;
        data.rarity = weapon.rarity;
        data.weaponType = weapon.weaponType;
        if (weapon.specialty) data.specialty = weapon.specialty;
        data.url = weapon.url;
    } else {
        name !== "TBA" && console.warn(`Could not find an entry with ID ${id}`);
    }
    return data;
}

export function createBannerOptions<
    T extends BannerOption,
    U extends BannerOption
>(banners: BannerProps, characters: T[], weapons: U[]) {
    const options: BannerOption[] = [];
    Object.values(banners).forEach((value) => {
        value.forEach((banner: Banner) => {
            banner.rateUps.forEach((item) => {
                if (item !== "TBA") {
                    options.push(
                        createBannerData({
                            id: typeof item === "number" ? item : undefined,
                            name: `${item}`,
                            characters,
                            weapons,
                        })
                    );
                }
            });
        });
    });
    return options.filter(
        (o1, index, arr) => arr.findIndex((o2) => o1.id === o2.id) === index
    );
}
