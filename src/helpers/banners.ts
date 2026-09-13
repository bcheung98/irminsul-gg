import {
    Banner,
    BannerLookup,
    BannerOption,
    BannerProps,
} from "@/types/banner";
import { Game, Server } from "@/types";

export function getBannerData(
    banners: BannerProps,
    game: Game,
    server: Server,
): BannerProps {
    if (game !== "uma" || server !== "NA") {
        return banners;
    }
    return Object.fromEntries(
        Object.entries(banners).map(([type, bannerList]) => [
            type,
            bannerList.filter((banner: Banner) => banner.start !== ""),
        ]),
    ) as BannerProps;
}

export function createBannerLookup<
    T extends BannerOption,
    U extends BannerOption,
>(characters: T[], weapons: U[]): BannerLookup {
    return {
        charactersById: new Map(characters.map((item) => [item.id, item])),
        charactersByName: new Map(characters.map((item) => [item.name, item])),
        weaponsById: new Map(weapons.map((item) => [item.id, item])),
        weaponsByName: new Map(weapons.map((item) => [item.name, item])),
    };
}

export function createBannerData({
    id,
    name = "TBA",
    lookup,
}: {
    id?: number;
    name?: string;
    lookup: BannerLookup;
}): BannerOption {
    const character =
        id !== undefined
            ? lookup.charactersById.get(id)
            : lookup.charactersByName.get(name);

    const weapon =
        id !== undefined
            ? lookup.weaponsById.get(id)
            : lookup.weaponsByName.get(name);

    if (character && weapon) {
        console.warn(`Two entries with ID ${id} were found`);
    }

    if (character) {
        return {
            category: "characters",
            id: character.id,
            name: character.name,
            displayName: character.displayName || character.name,
            rarity: character.rarity,
            element: character.element,
            weaponType: character.weaponType,
            outfit: character.outfit,
            url: character.url,
        };
    }

    if (weapon) {
        return {
            category: "weapons",
            id: weapon.id,
            name: weapon.name,
            displayName: weapon.displayName || weapon.name,
            rarity: weapon.rarity,
            weaponType: weapon.weaponType,
            specialty: weapon.specialty,
            url: weapon.url,
        };
    }

    if (name !== "TBA") {
        console.warn(`Could not find an entry with ID ${id}`);
    }

    return createFallbackBannerData(name);
}

export function createBannerOptions(
    banners: BannerProps,
    lookup: BannerLookup,
) {
    const options = new Map<string, BannerOption>();

    for (const bannerList of Object.values(banners)) {
        for (const banner of bannerList) {
            for (const item of banner.rateUps) {
                if (item === "TBA") continue;
                const option = createBannerData({
                    id: typeof item === "number" ? item : undefined,
                    name: `${item}`,
                    lookup,
                });
                options.set(`${option.category}-${option.id}`, option);
            }
        }
    }
    return [...options.values()];
}

function createFallbackBannerData(name: string): BannerOption {
    return {
        category: "characters",
        id: -1,
        name,
        displayName: name,
        rarity: 3,
        weaponType: "",
        url: "",
    };
}
