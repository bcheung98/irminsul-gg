"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterPassives from "@/components/_genshin/CharacterPassives";
import CharacterUpgrades from "@/components/CharacterUpgrades";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { AttributeData, AttributeDataMisc } from "@/types";
import { CharacterSkillsList } from "@/types/skill";

export default function CharacterPage({
    character,
}: {
    character: GenshinCharacter;
}) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

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

    const Skills = (
        <CharacterSkills
            title="Combat Talents"
            keys={Object.keys(character.skills)}
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const Passives = (
        <CharacterPassives
            keywords={character.keywords}
            attributes={attributes}
        />
    );

    const Upgrades = (
        <CharacterUpgrades
            title="Constellation"
            keywords={character.keywords}
            attributes={attributes}
        />
    );

    const header = <BetaTag version={character.release.version} />;

    const leftColumn = [];
    if (matches_up_md) leftColumn.push(Splash);
    if (matches_up_lg) leftColumn.push(InfoMisc);

    const rightColumn = [];
    if (matches_up_md) rightColumn.push(InfoMain);

    const children = [Skills, Passives, Upgrades];
    if (!matches_up_lg) children.unshift(InfoMisc);
    if (!matches_up_md) children.unshift(InfoMain, Splash);

    return (
        <CharacterPageRoot
            skills={skills}
            header={header}
            leftColumn={leftColumn.length > 0 && leftColumn}
            rightColumn={rightColumn.length > 0 && rightColumn}
        >
            {children}
        </CharacterPageRoot>
    );
}
