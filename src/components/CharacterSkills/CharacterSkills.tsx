import { useState } from "react";

// Component imports
import CharacterSkillTab from "./CharacterSkillTab";
import ContentBox from "@/components/ContentBox";
import SkillIcon from "@/components/SkillIcon";
import { default as Tabs } from "@/components/Tabs";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useGameTag } from "@/context";
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

    const textColor = useTextColor(theme.text);

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <ContentBox header={title} contentProps={{ padding: "8px 0px" }}>
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
                                icon={formatSkillIconURL(
                                    skillIconURLs[game][key],
                                    attributes
                                )}
                                attributes={attributes}
                                selected={index === tabValue}
                                borderWidth="3px"
                            />
                        }
                    />
                ))}
            </Tabs.List>
            {keys.map((key, index) => (
                <Tabs.Panel
                    key={key}
                    index={index}
                    value={tabValue}
                    padding="8px 24px 16px"
                >
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
