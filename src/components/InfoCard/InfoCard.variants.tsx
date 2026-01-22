import InfoCard from "./InfoCard";
import InfoCardMaterial from "./InfoCardMaterial";
import InfoCardSupport from "../_uma/InfoCardSupport";
import { InfoCardProps } from "./InfoCard.types";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { HSRCharacter, HSRRelic, HSRWeapon } from "@/types/hsr";
import { WuWaCharacter, WuWaEcho, WuWaWeapon } from "@/types/wuwa";
import { ZZZCharacter, ZZZWeapon, ZZZDriveDisc, ZZZBangboo } from "@/types/zzz";
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";

export function GenshinCharacterInfoCard({
    character,
    props,
}: {
    character: GenshinCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="genshin/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            href={character.url}
            {...props}
        />
    );
}

export function GenshinCharacterInfoCardMaterial({
    character,
    props,
}: {
    character: GenshinCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardMaterial
            tag="genshin/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            materials={character.materials}
            href={character.url}
            {...props}
        />
    );
}

export function GenshinWeaponInfoCard({
    weapon,
    props,
}: {
    weapon: GenshinWeapon;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="genshin/weapons"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            badgeLeft={{
                weaponType: weapon.weaponType,
                subStat: weapon.stats.subStat,
            }}
            url=""
            href={weapon.url}
            {...props}
        />
    );
}

export function GenshinArtifactInfoCard({
    artifact,
    props,
}: {
    artifact: GenshinArtifact;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="genshin/artifacts"
            id={Number(artifact.id)}
            key={artifact.id}
            name={artifact.displayName}
            rarity={artifact.rarity}
            url={`${artifact.id}_${artifact.pieces!.length > 1 ? 1 : 5}`}
            href={artifact.url}
            {...props}
        />
    );
}

export function HSRCharacterInfoCard({
    character,
    props,
}: {
    character: HSRCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="hsr/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            href={character.url}
            {...props}
        />
    );
}

export function HSRCharacterInfoCardMaterial({
    character,
    props,
}: {
    character: HSRCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardMaterial
            tag="hsr/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            materials={character.materials}
            href={character.url}
            {...props}
        />
    );
}

export function HSRWeaponInfoCard({
    weapon,
    props,
}: {
    weapon: HSRWeapon;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="hsr/lightcones"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            badgeLeft={{
                weaponType: weapon.weaponType,
            }}
            url=""
            href={weapon.url}
            {...props}
        />
    );
}

export function HSRRelicInfoCard({
    relic,
    props,
}: {
    relic: HSRRelic;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="hsr/relics"
            id={Number(relic.id)}
            key={relic.id}
            name={relic.displayName}
            rarity={relic.rarity}
            url={`${relic.id}`}
            href={relic.url}
            {...props}
        />
    );
}

export function WuWaCharacterInfoCard({
    character,
    props,
}: {
    character: WuWaCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="wuwa/resonators"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            href={character.url}
            {...props}
        />
    );
}

export function WuWaCharacterInfoCardMaterial({
    character,
    props,
}: {
    character: WuWaCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardMaterial
            tag="wuwa/resonators"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                weaponType: character.weaponType,
            }}
            materials={character.materials}
            href={character.url}
            {...props}
        />
    );
}

export function WuWaWeaponInfoCard({
    weapon,
    props,
}: {
    weapon: WuWaWeapon;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="wuwa/weapons"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            badgeLeft={{
                weaponType: weapon.weaponType,
                subStat: weapon.stats.subStat,
            }}
            url=""
            href={weapon.url}
            {...props}
        />
    );
}

export function WuWaEchoInfoCard({
    echo,
    props,
}: {
    echo: WuWaEcho;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="wuwa/echoes"
            id={Number(echo.id)}
            key={echo.id}
            name={echo.displayName}
            rarity={echo.rarity}
            badgeLeft={{
                sonata: echo.sonata,
            }}
            badgeRight={{
                cost: echo.cost,
            }}
            href={echo.url}
            {...props}
        />
    );
}

export function ZZZCharacterInfoCard({
    character,
    props,
}: {
    character: ZZZCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="zzz/agents"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.subElement || character.element,
                weaponType: character.weaponType,
            }}
            href={character.url}
            {...props}
        />
    );
}

export function ZZZCharacterInfoCardMaterial({
    character,
    props,
}: {
    character: ZZZCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardMaterial
            tag="zzz/agents"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.subElement || character.element,
                weaponType: character.weaponType,
            }}
            materials={character.materials}
            href={character.url}
            {...props}
        />
    );
}

export function ZZZWeaponInfoCard({
    weapon,
    props,
}: {
    weapon: ZZZWeapon;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="zzz/w-engines"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            badgeLeft={{
                weaponType: weapon.weaponType,
                subStat: weapon.stats.subStat,
            }}
            url={`${weapon.id}_large`}
            href={weapon.url}
            {...props}
        />
    );
}

export function ZZZDriveDiscInfoCard({
    disc,
    props,
}: {
    disc: ZZZDriveDisc;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="zzz/drive-discs"
            id={Number(disc.id)}
            key={disc.id}
            name={disc.displayName}
            rarity={disc.rarity}
            url={`${disc.id}_icon`}
            href={disc.url}
            {...props}
        />
    );
}

export function ZZZBangbooInfoCard({
    bangboo,
    props,
}: {
    bangboo: ZZZBangboo;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="zzz/bangboos"
            id={Number(bangboo.id)}
            key={bangboo.id}
            name={bangboo.displayName}
            rarity={bangboo.rarity}
            href={bangboo.url}
            {...props}
        />
    );
}

export function UmaCharacterInfoCard({
    character,
    props,
}: {
    character: UmaCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="uma/characters"
            id={Number(character.id)}
            key={character.id}
            name={character.name}
            title={`(${character.outfit || "Original"})`}
            rarity={character.rarity + 2}
            href={character.url}
            {...props}
        />
    );
}

export function UmaSupportInfoCard({
    support,
    props,
}: {
    support: UmaSupport;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardSupport
            tag="uma/supports"
            id={Number(support.id)}
            key={support.id}
            name={support.name}
            title={support.title}
            specialty={support.specialty}
            rarity={support.rarity}
            href={support.url}
            {...props}
        />
    );
}

export function EndfieldCharacterInfoCard({
    character,
    props,
}: {
    character: EndfieldCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="endfield/operators"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                specialty: character.specialty,
            }}
            badgeRight={{
                weaponType: character.weaponType,
            }}
            href={character.url}
            {...props}
        />
    );
}

export function EndfieldCharacterInfoCardMaterial({
    character,
    props,
}: {
    character: EndfieldCharacter;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCardMaterial
            tag="endfield/operators"
            id={Number(character.id)}
            key={character.id}
            name={character.displayName}
            rarity={character.rarity}
            badgeLeft={{
                element: character.element,
                specialty: character.specialty,
                weaponType: character.weaponType,
            }}
            materials={character.materials}
            href={character.url}
            {...props}
        />
    );
}

export function EndfieldWeaponInfoCard({
    weapon,
    props,
}: {
    weapon: EndfieldWeapon;
    props?: Partial<InfoCardProps>;
}) {
    return (
        <InfoCard
            tag="endfield/weapons"
            id={Number(weapon.id)}
            key={weapon.id}
            name={weapon.displayName}
            rarity={weapon.rarity}
            badgeLeft={{
                weaponType: weapon.weaponType,
            }}
            url=""
            href={weapon.url}
            {...props}
        />
    );
}
