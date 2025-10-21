import { BaseSyntheticEvent, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import ContentBox from "../ContentBox";
import SkillIcon from "../SkillIcon";
import CharacterSkillTab from "./CharacterSkillTab";
import { default as Tabs } from "../Tabs";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

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
        <ContentBox header={title} contentProps={{ padding: "8px 0px" }}>
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
                    padding="8px 24px 16px"
                >
                    <Fade in={index === tabValue} timeout={250} unmountOnExit>
                        {/* Use Box here because it can hold a ref */}
                        <Box>
                            <CharacterSkillTab
                                skill={skills[key]}
                                skillKey={`${key}`}
                                materials={materials}
                                attributes={attributes}
                            />
                        </Box>
                    </Fade>
                </Tabs.Panel>
            ))}
        </ContentBox>
    );
}
