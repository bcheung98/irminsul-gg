import InfoAvatar from "./InfoAvatar";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { InfoAvatarProps } from "./InfoAvatar.types";

export function GenshinCharacterInfoAvatar({
    character,
    props,
}: {
    character: GenshinCharacter;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="genshin/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            href={character.url}
            background="transparent"
            {...props}
        />
    );
}

export function GenshinWeaponInfoAvatar({
    weapon,
    props,
}: {
    weapon: GenshinWeapon;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="genshin/weapons"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            href={weapon.url}
            {...props}
        />
    );
}
