import { BaseData, Game, GameData } from "@/types";
import {
    GenshinCharacterInfoAvatar,
    GenshinWeaponInfoAvatar,
} from "./InfoAvatar.variants";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";

export * from "./InfoAvatar";
export * from "./InfoAvatar.variants";
export { default } from "./InfoAvatar";

type Data<T> = Record<"characters" | "weapons", T>;

export function renderInfoAvatar({
    game,
    tag,
    item,
    background,
    id,
}: {
    game: Game;
    tag: "characters" | "weapons";
    item: BaseData;
    background?: string;
    id?: string;
}) {
    const items: GameData<Data<React.ReactNode>> = {
        genshin: {
            characters: (
                <GenshinCharacterInfoAvatar
                    character={item as GenshinCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <GenshinWeaponInfoAvatar
                    weapon={item as GenshinWeapon}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
        },
        hsr: {
            characters: undefined,
            weapons: undefined,
        },
        wuwa: {
            characters: undefined,
            weapons: undefined,
        },
        zzz: {
            characters: undefined,
            weapons: undefined,
        },
        uma: {
            characters: undefined,
            weapons: undefined,
        },
    };
    return items[game][tag];
}
