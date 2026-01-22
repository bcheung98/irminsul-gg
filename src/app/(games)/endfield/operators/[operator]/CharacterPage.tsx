"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterTalents from "@/components/_endfield/CharacterTalents";
import CharacterUpgrades from "@/components/CharacterUpgrades";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { AttributeData, AttributeDataMisc } from "@/types";
import { CharacterSkillsList } from "@/types/skill";
import { EndfieldCharacter } from "@/types/endfield/character";

export default function CharacterPage({
    character,
}: {
    character: EndfieldCharacter;
}) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...character };
    const attributesMisc: AttributeDataMisc = { ...character };

    const skills: CharacterSkillsList = { ...character.skills };
    skills.passives = [
        ...character.passives,
        {
            name: attributeTitleMap[character.stats.attributes[0]],
            description: `Operator ${attributeMap[character.stats.attributes[0]]} $A.`,
            scaling: [["+10", "+15", "+15", "+20"]],
            levels: [1, 2, 3, 4],
            icon: `endfield/icons/stat-icons/${character.stats.attributes[0].toUpperCase()}`,
        },
        {
            name: "Outfitting",
            description: `Activate this to let the operator equip $A quality gear`,
            scaling: [["blue", "purple", "gold"]],
            levels: [1, 2, 3],
            icon: "endfield/icons/Gear",
        },
    ];
    skills.baseSkills = character.baseSkills;
    skills.upgrades = character.upgrades;

    const Splash = (
        <CharacterSplash
            id={Number(character.id)}
            outfits={character.outfits}
        />
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
            title="Combat Skills"
            keys={Object.keys(character.skills)}
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const Talents = (
        <CharacterTalents
            type="talent"
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const BaseSkills = (
        <CharacterTalents
            type="baseSkill"
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const Upgrades = (
        <CharacterUpgrades
            title="Potential"
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
    if (matches_up_md && !matches_up_lg) rightColumn.push(InfoMisc);

    const children = [Skills, Talents, BaseSkills, Upgrades];
    if (!matches_up_md) children.unshift(InfoMain, Splash, InfoMisc);

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

const attributeTitleMap = {
    str: "Forged",
    agi: "Skirmisher",
    int: "Keen Mind",
    wil: "Stalwart",
};

const attributeMap = {
    str: "Strength",
    agi: "Agility",
    int: "Intellect",
    wil: "Will",
};
