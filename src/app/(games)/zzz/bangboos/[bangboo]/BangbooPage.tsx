"use client";

// Component imports
import BangbooInfo from "@/components/_zzz/BangbooInfo";
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSkills from "@/components/CharacterSkills";
import InfoSplash from "@/components/InfoSplash";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import type { ZZZBangboo } from "@/types/zzz";
import type { AttributeData } from "@/types";
import type { CharacterSkillsList } from "@/types/skill";

export default function BangbooPage({ bangboo }: { bangboo: ZZZBangboo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...bangboo };

    const Splash = (
        <InfoSplash
            src={`zzz/bangboos/${bangboo.id}`}
            rarity={bangboo.rarity}
        />
    );

    const skills: CharacterSkillsList = { ...bangboo.skills };

    const InfoMain = (
        <BangbooInfo
            stats={bangboo.stats}
            attributes={attributes}
            image={Splash}
        />
    );

    const Skills = (
        <CharacterSkills
            title="Skills"
            keys={Object.keys(bangboo.skills)}
            materials={{}}
            attributes={attributes}
        />
    );

    const header = <BetaTag version={bangboo.release.version} />;

    const leftColumn = [];
    if (matches) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain);

    return (
        <CharacterPageRoot
            skills={skills}
            header={header}
            leftColumn={leftColumn.length > 0 && leftColumn}
            rightColumn={rightColumn.length > 0 && rightColumn}
            columnSizes={["auto", "grow"]}
        >
            {Skills}
        </CharacterPageRoot>
    );
}
