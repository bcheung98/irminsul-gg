// Component imports
import PlannerSlider, {
    LevelSliderContainer,
    MainContainer,
    SkillSliderContainer,
    SliderList,
} from "@/components/PlannerSliders";
import FlexBox from "@/components/FlexBox";
import StatNode from "./StatNode";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { range } from "@/utils";
import { useTextColor } from "@/helpers/styles";
import levelData from "@/data/levels";
import {
    usePlannerCardData,
    usePlannerCardMode,
} from "@/components/PlannerCardRoot/PlannerCard.utils";

// Type imports
import { CostSliderValues, PlannerType } from "@/types/planner";

export default function WuWaPlannerCard() {
    const theme = useTheme();

    let item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type: PlannerType = "element" in item ? "characters" : "weapons";

    const mode = usePlannerCardMode();

    const levels = levelData["nte"];

    const itemLevel = levels("level-asc");
    const skillLevel = levels("skill");
    const lifeSkillLevel = levels("life");

    const defaultLevelValues: CostSliderValues = {
        start: 1,
        stop: itemLevel.length,
        selected: true,
    };

    const defaultSkillValues: CostSliderValues = {
        start: 1,
        stop: skillLevel.length,
        selected: true,
    };

    const defaultLifeSkillValues: CostSliderValues = {
        start: 1,
        stop: lifeSkillLevel.length,
        selected: true,
    };

    const defaultNodeValues: CostSliderValues = {
        start: 0,
        stop: 0,
        selected: true,
    };

    const sliders: SliderList = [
        {
            skillKey: "level",
            levels: itemLevel,
            values: item.values.level || defaultLevelValues,
        },
        {
            skillKey: "attack",
            levels: skillLevel,
            values: item.values.attack || defaultSkillValues,
            icon: `nte/skills/${item.id}_skill`,
        },
        {
            skillKey: "skill",
            levels: skillLevel,
            values: item.values.skill || defaultSkillValues,
            icon: `nte/skills/${item.id}_skill`,
        },
        {
            skillKey: "ultimate",
            levels: skillLevel,
            values: item.values.ultimate || defaultSkillValues,
            icon: `nte/skills/${item.id}_ultimate`,
        },
        {
            skillKey: "support",
            levels: skillLevel,
            values: item.values.support || defaultSkillValues,
            icon: `nte/skills/${item.id}_support`,
        },
        {
            skillKey: "life",
            levels: lifeSkillLevel,
            values: item.values.life || defaultLifeSkillValues,
            icon: `nte/skills/${item.id}_life`,
        },
    ];

    const nodes = Object.fromEntries(
        range(1, 2).map((index) => [
            `passive${index}`,
            item.values[`passive${index}`] || defaultNodeValues,
        ]),
    );

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("nte", item.element)
            : theme.text.selected;

    const [Level, Attack, Skill, Ultimate, Support, Life] = sliders.map(
        (slider) => (
            <PlannerSlider
                key={slider.skillKey}
                mode={mode}
                type={type}
                color={color}
                {...item}
                {...slider}
            />
        ),
    );

    return (
        <Stack spacing={2} divider={<Divider />}>
            <MainContainer mode={mode}>
                <LevelSliderContainer mode={mode}>{Level}</LevelSliderContainer>
                {type === "characters" &&
                    [Attack, Skill, Ultimate, Support, Life].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
            </MainContainer>
            {type === "characters" && (
                <FlexBox spacing={2}>
                    {range(1, 2).map((index) => (
                        <StatNode
                            key={`passive${index}`}
                            id={`passive${index}`}
                            mode={mode}
                            values={nodes}
                            attributes={{ ...item }}
                        />
                    ))}
                </FlexBox>
            )}
        </Stack>
    );
}
