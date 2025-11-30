import InfoCard from "./InfoCard";
import InfoCardMaterial from "./InfoCardMaterial";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { InfoCardProps } from "./InfoCard.types";

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
            url={`${artifact.id}_${artifact.pieces.length > 1 ? 1 : 5}`}
            href={artifact.url}
            {...props}
        />
    );
}
