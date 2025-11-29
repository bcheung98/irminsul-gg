import InfoCard from "./InfoCard";
import InfoCardMaterial from "./InfoCardMaterial";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { InfoCardProps } from "./InfoCard.types";
import { splitJoin } from "@/utils";

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
            key={character.id}
            name={character.name}
            displayName={character.displayName}
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
            key={character.id}
            name={character.name}
            displayName={character.displayName}
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
            key={weapon.id}
            name={weapon.name}
            displayName={weapon.displayName}
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
            key={artifact.id}
            name={`${splitJoin(artifact.name)}/${
                artifact.pieces.length > 1 ? "flower" : "circlet"
            }`}
            displayName={artifact.displayName}
            rarity={artifact.rarity}
            url="sets"
            href={artifact.url}
            {...props}
        />
    );
}
