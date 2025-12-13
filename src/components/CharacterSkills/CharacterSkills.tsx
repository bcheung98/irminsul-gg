import { useState } from "react";

// Component imports
import CharacterSkillTab from "./CharacterSkillTab";
import CharacterBuffs from "@/components/CharacterBuffs";
import ContentBox from "@/components/ContentBox";
import SkillIcon from "@/components/SkillIcon";
import { default as Tabs } from "@/components/Tabs";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useGameTag, useSkillVersionContext } from "@/context";
import { useTextColor } from "@/helpers/styles";
import { skillIconURLs } from "@/data/skills";
import { formatSkillIconURL } from "@/helpers/skills";

// Type imports
import { CharacterSkillsProps } from "./CharacterSkills.types";

export default function CharacterSkills({
    title,
    keys,
    keywords,
    materials,
    attributes,
}: CharacterSkillsProps) {
    const theme = useTheme();

    const game = useGameTag();

    const buffs = useSkillVersionContext();

    const textColor = useTextColor(theme.text);

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const skillIcon = (key: string) => {
        if (key === "special" && attributes.weaponType === "Rupture")
            return "zzz/skills/SpecialEX2";
        return formatSkillIconURL(skillIconURLs[game][key], attributes);
    };

    return (
        <ContentBox
            header={title}
            contentProps={{ padding: "8px 0px" }}
            actions={<CharacterBuffs {...buffs} />}
        >
            <Tabs.List
                value={tabValue}
                onChange={handleTabChange}
                tabcolor={textColor(game, attributes.element)}
            >
                {keys.map((key, index) => (
                    <Tabs.Selector
                        key={key}
                        icon={
                            <SkillIcon
                                icon={skillIcon(key)}
                                attributes={attributes}
                                selected={index === tabValue}
                                borderWidth="3px"
                                padding={game === "zzz" ? "0px" : "4px"}
                            />
                        }
                    />
                ))}
            </Tabs.List>
            {keys.map((key, index) => (
                <Tabs.Panel key={key} index={index} value={tabValue}>
                    <CharacterSkillTab
                        skillKey={key}
                        keywords={keywords}
                        materials={materials}
                        attributes={attributes}
                    />
                </Tabs.Panel>
            ))}
        </ContentBox>
    );
}
