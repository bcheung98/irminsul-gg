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

    const levels = levelData["wuwa"];

    const itemLevel = levels("level-asc", item.rarity);
    const skillLevel = levels("skill", item.rarity);

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
            icon: `wuwa/skills/Attack_${item.weaponType}`,
        },
        {
            skillKey: "skill",
            levels: skillLevel,
            values: item.values.skill || defaultSkillValues,
            icon: `wuwa/skills/${item.id}_skill`,
        },
        {
            skillKey: "ultimate",
            levels: skillLevel,
            values: item.values.ultimate || defaultSkillValues,
            icon: `wuwa/skills/${item.id}_ultimate`,
        },
        {
            skillKey: "forte",
            levels: skillLevel,
            values: item.values.forte || defaultSkillValues,
            icon: `wuwa/skills/${item.id}_forte`,
        },
        {
            skillKey: "intro",
            levels: skillLevel,
            values: item.values.intro || defaultSkillValues,
            icon: `wuwa/skills/${item.id}_intro`,
        },
    ];

    const nodes = Object.fromEntries(
        range(0, 9).map((index) => [
            getNodeKey(index),
            item.values[getNodeKey(index)] || defaultNodeValues,
        ])
    );

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("wuwa", item.element)
            : theme.text.selected;

    const [Level, Attack, Skill, Ultimate, Forte, Intro] = sliders.map(
        (slider) => (
            <PlannerSlider
                key={slider.skillKey}
                mode={mode}
                type={type}
                color={color}
                {...item}
                {...slider}
            />
        )
    );

    return (
        <Stack spacing={2} divider={<Divider />}>
            <MainContainer mode={mode}>
                <LevelSliderContainer mode={mode}>{Level}</LevelSliderContainer>
                {type === "characters" &&
                    [Attack, Skill, Ultimate, Forte, Intro].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
            </MainContainer>
            {type === "characters" && (
                <FlexBox spacing={2}>
                    {range(1, 5, 2).map((index) => (
                        <Stack
                            key={index}
                            spacing={2}
                            direction="column-reverse"
                        >
                            {range(0, 1).map((i) => (
                                <StatNode
                                    key={`${getNodeID(index + i)}`}
                                    id={`${getNodeID(index + i)}`}
                                    bonusStats={item.bonusStats}
                                    mode={mode}
                                    values={nodes}
                                    attributes={{ ...item }}
                                />
                            ))}
                        </Stack>
                    ))}
                </FlexBox>
            )}
        </Stack>
    );
}

const getNodeKey = (index: number) =>
    `${index < 2 ? "passive" : "bonusStat"}${
        index < 2 ? index + 1 : index - 1
    }`;

const getNodeID = (index: number) =>
    `${
        [5, 6].includes(index)
            ? `passive${index - 4}`
            : `bonusStat${index > 6 ? index - 2 : index}`
    }`;
