"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterUpgrades from "@/components/CharacterUpgrades";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { AttributeData, AttributeDataMisc } from "@/types";
import { CharacterSkillsList } from "@/types/skill";
import { HSRCharacter } from "@/types/hsr/character";

export default function CharacterPage({
    character,
}: {
    character: HSRCharacter;
}) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...character };
    const attributesMisc: AttributeDataMisc = { ...character };

    const skills: CharacterSkillsList = { ...character.skills };
    skills.upgrades = character.upgrades;

    if (character.memosprite) {
        skills["memo-skill"] = character.memosprite.skill;
        skills["memo-talent"] = character.memosprite.talent;
    }

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
            title="Skills"
            keys={Object.keys(character.skills)}
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const Memosprite = (
        <CharacterSkills
            title={`Memosprite "${character.memosprite?.name}"`}
            keys={["memo-skill", "memo-talent"]}
            keywords={character.keywords}
            materials={character.materials}
            attributes={attributes}
        />
    );

    const Upgrades = (
        <CharacterUpgrades
            title="Eidolons"
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

    const children = [Skills];
    if (character.memosprite) children.push(Memosprite);
    children.push(Upgrades);
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
