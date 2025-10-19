import { BaseSyntheticEvent, CSSProperties, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import ContentBox from "../ContentBox";
import { default as Tabs } from "../Tabs";
import SkillIcon from "../SkillIcon";
import CharacterSkillTab from "./CharacterSkillTab";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { objectKeys, splitJoin } from "@/utils";
import { useTextColor } from "@/helpers/useTextColor";

// Type imports
import { CharacterSkillsProps } from "./CharacterSkills.types";

export default function CharacterSkills({
    title,
    skills,
    materials,
    attributes,
}: CharacterSkillsProps) {
    const theme = useTheme();

    const [_, game, __, name] = usePathname().split("/");

    const textColor = useTextColor(theme.text);

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    function getIconURL(key: string | number) {
        return key === "attack"
            ? `${game}/weapons/icons/${attributes.weaponType}`
            : `${game}/characters/talents/${splitJoin(
                  name,
                  "-"
              ).toLowerCase()}_${key}`;
    }

    return (
        <ContentBox header={title} contentProps={{ padding: 0 }}>
            <Tabs.List
                value={tabValue}
                onChange={handleTabChange}
                tabcolor={textColor(game, attributes.element)}
            >
                {objectKeys(skills).map((key, index) => (
                    <Tabs.Selector
                        key={key}
                        icon={
                            <SkillIcon
                                icon={getIconURL(key)}
                                attributes={attributes}
                                selected={index === tabValue}
                            />
                        }
                    />
                ))}
            </Tabs.List>
            {objectKeys(skills).map((key, index) => (
                <Tabs.Panel
                    key={key}
                    index={index}
                    value={tabValue}
                    padding="16px 24px"
                >
                    <CharacterSkillTab
                        skill={skills[key]}
                        skillKey={key}
                        materials={materials}
                        attributes={attributes}
                    />
                </Tabs.Panel>
            ))}
        </ContentBox>
    );
}
