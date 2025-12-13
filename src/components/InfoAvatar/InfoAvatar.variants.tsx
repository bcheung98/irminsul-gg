import InfoAvatar from "./InfoAvatar";
import { InfoAvatarProps } from "./InfoAvatar.types";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { HSRCharacter, HSRWeapon } from "@/types/hsr";
import { WuWaCharacter, WuWaEcho, WuWaWeapon } from "@/types/wuwa";
import { ZZZCharacter, ZZZWeapon } from "@/types/zzz";

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

export function HSRCharacterInfoAvatar({
    character,
    props,
}: {
    character: HSRCharacter;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="hsr/characters"
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

export function HSRWeaponInfoAvatar({
    weapon,
    props,
}: {
    weapon: HSRWeapon;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="hsr/lightcones"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            href={weapon.url}
            url={`${weapon.id}_icon`}
            {...props}
        />
    );
}

export function WuWaCharacterInfoAvatar({
    character,
    props,
}: {
    character: WuWaCharacter;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="wuwa/resonators"
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

export function WuWaWeaponInfoAvatar({
    weapon,
    props,
}: {
    weapon: WuWaWeapon;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="wuwa/weapons"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            href={weapon.url}
            {...props}
        />
    );
}

export function WuWaEchoInfoAvatar({
    echo,
    props,
}: {
    echo: WuWaEcho;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="wuwa/echoes"
            id={Number(echo.id)}
            key={echo.id}
            name={echo.displayName}
            rarity={echo.rarity}
            href={echo.url}
            {...props}
        />
    );
}

export function ZZZCharacterInfoAvatar({
    character,
    props,
}: {
    character: ZZZCharacter;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="zzz/agents"
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

export function ZZZWeaponInfoAvatar({
    weapon,
    props,
}: {
    weapon: ZZZWeapon;
    props?: Partial<InfoAvatarProps>;
}) {
    return (
        <InfoAvatar
            tag="zzz/w-engines"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            href={weapon.url}
            url={`${weapon.id}_large`}
            {...props}
        />
    );
}
