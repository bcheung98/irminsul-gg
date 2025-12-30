"use client";

// Component imports
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterInfoMisc from "@/components/CharacterInfoMisc";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterUpgrades from "@/components/CharacterUpgrades";
import CharacterPotential from "@/components/_zzz/CharacterPotential";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { AttributeData, AttributeDataMisc } from "@/types";
import { CharacterSkillsList } from "@/types/skill";
import { ZZZCharacter } from "@/types/zzz";

export default function CharacterPage({
    character,
}: {
    character: ZZZCharacter;
}) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...character };
    const attributesMisc: AttributeDataMisc = { ...character };

    const skills: CharacterSkillsList = { ...character.skills };
    skills.upgrades = character.upgrades;
    skills.ascension = [
        {
            name: "",
            description: "",
            scaling: Object.entries(character.stats.ascension).map(
                ([stat, scaling], index) => {
                    let values: (string | number)[] = [];
                    if (index) values = [0, 0, ...scaling];
                    else values = [0, scaling[0], ...scaling];
                    values = values.map((value) =>
                        [
                            "CRIT Rate",
                            "CRIT DMG",
                            "PEN Ratio",
                            "Base Energy Regen",
                            "HP",
                        ].includes(stat)
                            ? `${Number(value) / 100}%`
                            : `${value}`
                    );
                    return [stat, values].flat() as string[];
                }
            ),
        },
    ];

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

    const Potential = character.potential ? (
        <CharacterPotential
            potential={character.potential}
            attributes={attributes}
        />
    ) : (
        <></>
    );

    const Upgrades = (
        <CharacterUpgrades
            title="Mindscape Cinema"
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
    if (character.potential) children.push(Potential);
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
