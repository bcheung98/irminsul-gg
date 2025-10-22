"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterPassives from "@/components/_genshin/CharacterPassives";
import CharacterUpgrades from "@/components/CharacterUpgrades";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { AttributeData, AttributeDataMisc } from "@/types";
import { CharacterSkillsList } from "@/types/skill";

export default function CharacterPage({
    character,
}: {
    character: GenshinCharacter;
}) {
    const attributes: AttributeData = {
        name: character.name,
        displayName: character.fullName,
        title: character.title,
        description: character.description,
        element: character.element,
        weaponType: character.weapon,
        rarity: character.rarity,
        arkhe: character.arkhe,
    };

    const attributesMisc: AttributeDataMisc = {
        constellationName: character.constellationName,
        nation: character.nation,
        birthday: character.birthday,
        release: character.release,
        voiceActors: character.voiceActors,
    };

    const skills: CharacterSkillsList = {};

    Object.entries(character.skills).forEach(([key, skill]) => {
        if (skill) skills[key] = [skill];
    });
    skills.passives = character.passives;
    skills.upgrades = Object.values(character.constellation).map(
        (upgrade) => upgrade
    );

    const Splash = (
        <CharacterSplash name={character.name} outfits={character.outfits} />
    );

    const InfoMisc = <CharacterInfoMisc {...attributesMisc} />;

    const InfoMain = (
        <CharacterInfo
            stats={character.stats}
            materials={character.materials}
            attributes={attributes}
        />
    );

    return (
        <CharacterPageRoot
            skills={skills}
            leftColumn={[Splash, InfoMisc]}
            rightColumn={[InfoMain]}
        >
            <CharacterSkills
                title="Combat Talents"
                skills={character.skills}
                materials={character.materials}
                attributes={attributes}
            />
            <CharacterPassives
                passives={character.passives}
                attributes={attributes}
            />
            <CharacterUpgrades
                title="Constellation"
                upgrades={character.constellation}
                attributes={attributes}
            />
        </CharacterPageRoot>
    );
}
