import { useEffect, useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import SkillCard from "@/components/SkillCard";
import SkillDescription from "@/components/SkillDescription";
import Text from "@/components/Text";
import Slider from "@/components/Slider";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Helper imports
import { range } from "@/utils";

// Type imports
import { AttributeData } from "@/types";
import { Skill } from "@/types/skill";

export default function CharacterPotential({
    potential,
    attributes,
}: {
    potential: Skill[];
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const className = "character-potential-value";

    const [sliderValue, setSliderValue] = useState(5);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(6).map((level) => ({
        value: level,
        label: (
            <Text
                variant={sliderValue === level ? "subtitle1" : "subtitle2"}
                weight={sliderValue === level ? "highlight" : "primary"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === level ? 1 : 0.25,
                }}
            >
                {level + 1}
            </Text>
        ),
    }));

    useEffect(() => {
        const targets = document.getElementsByClassName(className);
        potential[0].scaling?.forEach(
            (subScaling: (string | number)[], index: number) => {
                const target = targets[index];
                if (target) {
                    target.innerHTML = subScaling[sliderValue - 1].toString();
                }
            }
        );
    }, [sliderValue]);

    return (
        <ContentBox header="Potential">
            <Stack spacing={2}>
                {sliderValue > 0 && (
                    <SkillCard>
                        <Stack spacing={1}>
                            <Text
                                variant="h6"
                                weight="highlight"
                            >{`Awakened Potential: ${potential[0].name}`}</Text>
                            <Text
                                component="span"
                                variant="subtitle1"
                                sx={{
                                    color: theme.text.description,
                                }}
                            >
                                <SkillDescription
                                    game="zzz"
                                    description={potential[0].description}
                                    newClassName={className}
                                />
                            </Text>
                        </Stack>
                    </SkillCard>
                )}
                <Box sx={{ width: { xs: "90%", md: "30vw" } }}>
                    <Slider
                        value={sliderValue}
                        marks={marks}
                        step={1}
                        min={0}
                        max={5}
                        onChange={handleSliderChange}
                        size={matches ? "medium" : "small"}
                        sx={{
                            minWidth: "100px",
                            maxWidth: "300px",
                            ml: 2,
                            color:
                                attributes.colors?.accent ||
                                theme.text.selected,
                        }}
                    />
                </Box>
            </Stack>
        </ContentBox>
    );
}
