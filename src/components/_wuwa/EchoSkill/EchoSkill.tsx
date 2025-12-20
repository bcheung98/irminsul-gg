import { useState } from "react";

// Component imports
import SkillCard from "@/components/SkillCard";
import SkillDescription from "@/components/SkillDescription";
import TextLabel from "@/components/TextLabel";
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
import { WuWaEcho } from "@/types/wuwa";

export default function EchoSkill({ echo }: { echo: WuWaEcho }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [sliderValue, setSliderValue] = useState(5);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(2, 5).map((rarity) => ({
        value: rarity,
        label: (
            <Text
                variant={sliderValue === rarity ? "subtitle1" : "subtitle2"}
                weight={sliderValue === rarity ? "highlight" : "primary"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === rarity ? 1 : 0.25,
                }}
            >
                {rarity}★
            </Text>
        ),
    }));

    const targets = document.getElementsByClassName("echo-skill-value");
    echo.skill.scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index];
        if (target) {
            target.innerHTML = subScaling[sliderValue - 1];
        }
    });

    return (
        <Stack spacing={1}>
            <TextLabel
                icon={`wuwa/echo-skills/${echo.id}`}
                iconProps={{
                    size: 40,
                    styles: {
                        border: `2px solid ${theme.border.color.primary}`,
                        borderRadius: "64px",
                        padding: "2px",
                        backgroundColor: theme.iconBackground.primary,
                    },
                }}
                title="Echo Skill"
                titleProps={{ variant: "h6", weight: "highlight" }}
                spacing={2}
            />
            <SkillCard size={12}>
                <Stack spacing={2}>
                    <Text variant="subtitle1">
                        <SkillDescription
                            game="wuwa"
                            description={echo.skill.description}
                            targetClassName="text-value"
                            newClassName="echo-skill-value"
                        />
                    </Text>
                    <Text sx={{ color: theme.text.description }}>
                        {"Cooldown: "}
                        <span
                            style={{
                                color: theme.text.header,
                                fontWeight: theme.font.weight.highlight,
                            }}
                        >
                            {echo.skill.cooldown}s
                        </span>
                    </Text>
                    {echo.skill.scaling && (
                        <Box sx={{ width: { xs: "90%", md: "30vw" } }}>
                            <Slider
                                value={sliderValue}
                                marks={marks}
                                step={1}
                                min={2}
                                max={5}
                                onChange={handleSliderChange}
                                size={matches ? "medium" : "small"}
                                sx={{
                                    minWidth: "100px",
                                    maxWidth: "200px",
                                    ml: 2,
                                }}
                            />
                        </Box>
                    )}
                </Stack>
            </SkillCard>
        </Stack>
    );
}
