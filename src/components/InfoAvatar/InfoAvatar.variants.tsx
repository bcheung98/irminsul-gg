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
            key={character.id}
            name={character.name}
            displayName={character.fullName}
            rarity={character.rarity}
            href={character.url}
            background="transparent"
            url="avatars"
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
            key={weapon.id}
            name={weapon.name}
            displayName={weapon.displayName}
            rarity={weapon.rarity}
            href={weapon.url}
            url=""
            {...props}
        />
    );
}
