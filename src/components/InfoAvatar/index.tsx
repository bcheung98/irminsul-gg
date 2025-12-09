import { BaseData, Game, GameData } from "@/types";
import {
    GenshinCharacterInfoAvatar,
    GenshinWeaponInfoAvatar,
    HSRCharacterInfoAvatar,
    HSRWeaponInfoAvatar,
    WuWaCharacterInfoAvatar,
    WuWaWeaponInfoAvatar,
} from "./InfoAvatar.variants";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { HSRCharacter, HSRWeapon } from "@/types/hsr";
import { WuWaCharacter, WuWaWeapon } from "@/types/wuwa";

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
            characters: (
                <HSRCharacterInfoAvatar
                    character={item as HSRCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <HSRWeaponInfoAvatar
                    weapon={item as HSRWeapon}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
        },
        wuwa: {
            characters: (
                <WuWaCharacterInfoAvatar
                    character={item as WuWaCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <WuWaWeaponInfoAvatar
                    weapon={item as WuWaWeapon}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
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

export * from "./InfoAvatar";
export * from "./InfoAvatar.variants";
export { default } from "./InfoAvatar";
