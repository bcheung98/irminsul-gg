"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterPassives from "@/components/_nte/CharacterPassives";
import CharacterUpgrades from "@/components/CharacterUpgrades";
import InfoSplash from "@/components/InfoSplash";
import CharacterConsole from "@/components/_nte/CharacterConsole";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import type { AttributeData, AttributeDataMisc } from "@/types";
import type { CharacterSkillsList } from "@/types/skill";
import type { NTECharacter } from "@/types/nte/character";

export default function CharacterPage({
    character,
}: {
    character: NTECharacter;
}) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...character };
    const attributesMisc: AttributeDataMisc = { ...character };

    const skills: CharacterSkillsList = { ...character.skills };
    skills.passives = character.passives;
    skills.upgrades = character.upgrades;

    const Splash = (
        <CharacterSplash
            id={Number(character.id)}
            outfits={character.outfits}
        />
    );

    const SplashMini = <InfoSplash src={`nte/espers/${character.id}`} />;

    const InfoMisc = <CharacterInfoMisc {...attributesMisc} />;

    const InfoMain = (
        <CharacterInfo
            stats={character.stats}
            materials={character.materials}
            attributes={attributes}
            image={SplashMini}
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

    const Passives = (
        <CharacterPassives
            keywords={character.keywords}
            attributes={attributes}
            materials={character.materials}
        />
    );

    const Upgrades = (
        <CharacterUpgrades
            title="Awakening"
            keywords={character.keywords}
            attributes={attributes}
        />
    );

    const Console = <CharacterConsole charConsole={character.console} />;

    const header = <BetaTag version={character.release.version} />;

    const leftColumn = [];
    if (matches_up_md) leftColumn.push(Splash);
    if (matches_up_lg) leftColumn.push(InfoMisc);

    const rightColumn = [];
    if (matches_up_md) rightColumn.push(InfoMain);
    if (matches_up_md && !matches_up_lg) rightColumn.push(InfoMisc);

    const children = [Skills, Passives, Upgrades, Console];
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
