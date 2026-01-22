import { BaseData, Game, GameData } from "@/types";
import {
    EndfieldCharacterInfoAvatar,
    EndfieldWeaponInfoAvatar,
    GenshinCharacterInfoAvatar,
    GenshinWeaponInfoAvatar,
    HSRCharacterInfoAvatar,
    HSRWeaponInfoAvatar,
    UmaCharacterInfoAvatar,
    UmaSupportInfoAvatar,
    WuWaCharacterInfoAvatar,
    WuWaWeaponInfoAvatar,
    ZZZCharacterInfoAvatar,
    ZZZWeaponInfoAvatar,
} from "./InfoAvatar.variants";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { HSRCharacter, HSRWeapon } from "@/types/hsr";
import { WuWaCharacter, WuWaWeapon } from "@/types/wuwa";
import { ZZZCharacter, ZZZWeapon } from "@/types/zzz";
import { UmaCharacter } from "@/types/uma/character";
import { UmaSupport } from "@/types/uma";
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";

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
            characters: (
                <ZZZCharacterInfoAvatar
                    character={item as ZZZCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <ZZZWeaponInfoAvatar
                    weapon={item as ZZZWeapon}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
        },
        uma: {
            characters: (
                <UmaCharacterInfoAvatar
                    character={item as UmaCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <UmaSupportInfoAvatar
                    support={item as UmaSupport}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
        },
        endfield: {
            characters: (
                <EndfieldCharacterInfoAvatar
                    character={item as EndfieldCharacter}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
            weapons: (
                <EndfieldWeaponInfoAvatar
                    weapon={item as EndfieldWeapon}
                    props={{
                        componentID: `${item.id}${id}`,
                        background: background,
                    }}
                />
            ),
        },
    };
    return items[game][tag];
}

export * from "./InfoAvatar";
export * from "./InfoAvatar.variants";
export { default } from "./InfoAvatar";
