"use client";

// Component imports
import BangbooInfo from "@/components/_zzz/BangbooInfo";
import CharacterPageRoot from "@/components/CharacterPageRoot";
import CharacterSkills from "@/components/CharacterSkills";
import Image from "@/components/Image";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import {
    getZZZBackgroundColor,
    getZZZRarityColor,
} from "@/helpers/zzz/rarityColors";

// Type imports
import { ZZZBangboo } from "@/types/zzz";
import { AttributeData } from "@/types";
import { CharacterSkillsList } from "@/types/skill";

export default function BangbooPage({ bangboo }: { bangboo: ZZZBangboo }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...bangboo };

    let imgURL = `zzz/bangboos/${bangboo.id}`;

    const Splash = (
        <Image
            src={imgURL}
            style={{
                width: matches ? "100%" : "96px",
                maxWidth: "256px",
                height: "auto",
                backgroundColor: theme.background(2),
                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${bangboo.rarity}.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                borderRadius: theme.contentBox.border.radius * 4,
                border: `2px solid ${getZZZRarityColor(bangboo.rarity)}`,
                boxShadow: `inset 0 0 24px 16px ${getZZZBackgroundColor(
                    bangboo.rarity
                )}`,
            }}
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
