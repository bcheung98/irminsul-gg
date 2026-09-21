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
import { getTalentNodes } from "@/helpers/endfield/getTalentNodes";

// Type imports
import type { CostSliderValues, PlannerType } from "@/types/planner";

export default function EndfieldPlannerCard() {
    const theme = useTheme();

    let item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type: PlannerType = "element" in item ? "characters" : "weapons";

    const mode = usePlannerCardMode();

    const levels = levelData["endfield"];

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
            icon: `endfield/skills/Attack_${item.weaponType}`,
        },
        {
            skillKey: "skill",
            levels: skillLevel,
            values: item.values.skill || defaultSkillValues,
            icon: `endfield/skills/${item.id}_skill`,
        },
        {
            skillKey: "ultimate",
            levels: skillLevel,
            values: item.values.ultimate || defaultSkillValues,
            icon: `endfield/skills/${item.id}_ultimate`,
        },
        {
            skillKey: "combo",
            levels: skillLevel,
            values: item.values.combo || defaultSkillValues,
            icon: `endfield/skills/${item.id}_combo`,
        },
    ];

    const talentCount = getTalentNodes(item.talents ?? []).length;

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("endfield", item.element)
            : theme.text.selected;

    const [Level, Attack, Skill, Ultimate, Combo] = sliders.map((slider) => (
        <PlannerSlider
            key={slider.skillKey}
            mode={mode}
            type={type}
            color={color}
            {...item}
            {...slider}
        />
    ));

    return (
        <Stack spacing={2} divider={<Divider />}>
            <MainContainer mode={mode}>
                <LevelSliderContainer mode={mode}>{Level}</LevelSliderContainer>
                {type === "characters" &&
                    [Attack, Skill, Combo, Ultimate].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
            </MainContainer>
            {type === "characters" && (
                <Stack spacing={2}>
                    <FlexBox spacing={2}>
                        {range(1, talentCount).map((index) => (
                            <StatNode
                                key={`talent${index}`}
                                id={`talent${index}`}
                                mode={mode}
                                values={item.values}
                                talents={item.talents}
                                attributes={{ ...item }}
                            />
                        ))}
                    </FlexBox>
                    {!!item.baseSkills?.length && (
                        <FlexBox spacing={2}>
                            {range(
                                1,
                                item.baseSkills.flatMap((skill) => skill.levels)
                                    .length,
                            ).map((index) => (
                                <StatNode
                                    key={`baseSkill${index}`}
                                    id={`baseSkill${index}`}
                                    mode={mode}
                                    values={item.values}
                                    baseSkills={item.baseSkills}
                                    attributes={{ ...item }}
                                />
                            ))}
                        </FlexBox>
                    )}
                    <FlexBox spacing={2}>
                        {range(1, 4).map((i) => (
                            <StatNode
                                key={`attribute${i}`}
                                id={`attribute${i}`}
                                mode={mode}
                                values={item.values}
                                mainAttribute={item.mainAttribute}
                                attributes={{ ...item }}
                            />
                        ))}
                    </FlexBox>
                    <FlexBox spacing={2}>
                        {range(1, 3).map((i) => (
                            <StatNode
                                key={`outfitting${i}`}
                                id={`outfitting${i}`}
                                mode={mode}
                                values={item.values}
                                attributes={{ ...item }}
                            />
                        ))}
                    </FlexBox>
                </Stack>
            )}
        </Stack>
    );
}
