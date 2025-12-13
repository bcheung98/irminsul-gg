// Component imports
import PlannerSlider, {
    LevelSliderContainer,
    MainContainer,
    SkillSliderContainer,
    SliderList,
} from "@/components/PlannerSliders";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useTextColor } from "@/helpers/styles";
import levelData from "@/data/levels";
import {
    usePlannerCardData,
    usePlannerCardMode,
} from "@/components/PlannerCardRoot/PlannerCard.utils";

// Type imports
import { CostSliderValues, PlannerType } from "@/types/planner";

export default function ZZZPlannerCard() {
    const theme = useTheme();

    let item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type: PlannerType = "element" in item ? "characters" : "weapons";

    const mode = usePlannerCardMode();

    const levels = levelData["zzz"];

    const itemLevel = levels("level-asc");
    const skillLevel = levels("skill");
    const coreSkillLevel = levels("core-skill");

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

    const defaultCoreSkillValues: CostSliderValues = {
        start: 1,
        stop: coreSkillLevel.length,
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
            icon: `zzz/skills/Attack`,
        },
        {
            skillKey: "dodge",
            levels: skillLevel,
            values: item.values.dodge || defaultSkillValues,
            icon: `zzz/skills/Dodge`,
        },
        {
            skillKey: "assist",
            levels: skillLevel,
            values: item.values.assist || defaultSkillValues,
            icon: `zzz/skills/Assist`,
        },
        {
            skillKey: "special",
            levels: skillLevel,
            values: item.values.special || defaultSkillValues,
            icon: `zzz/skills/${
                item.weaponType === "Rupture" ? "SpecialEX2" : "SpecialEX"
            }`,
        },
        {
            skillKey: "chain",
            levels: skillLevel,
            values: item.values.chain || defaultSkillValues,
            icon: `zzz/skills/Ultimate`,
        },
        {
            skillKey: "core",
            levels: coreSkillLevel,
            values: item.values.core || defaultCoreSkillValues,
            icon: `zzz/skills/Core`,
        },
    ];

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("zzz", item.element)
            : theme.text.selected;

    const [Level, Basic, Dodge, Assist, Special, Chain, Core] = sliders.map(
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
        <MainContainer mode={mode}>
            <LevelSliderContainer mode={mode}>{Level}</LevelSliderContainer>
            {type === "characters" &&
                [Basic, Dodge, Assist, Special, Chain, Core].map((slider) => (
                    <SkillSliderContainer key={slider.key} mode={mode}>
                        {slider}
                    </SkillSliderContainer>
                ))}
        </MainContainer>
    );
}
