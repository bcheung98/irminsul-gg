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
import { splitJoin } from "@/utils";
import { useTextColor } from "@/helpers/styles";
import levelData from "@/data/levels";
import {
    usePlannerCardData,
    usePlannerCardMode,
} from "@/components/PlannerCardRoot/PlannerCard.utils";

// Type imports
import { CostSliderValues, PlannerType } from "@/types/planner";

export default function GenshinPlannerCard() {
    const theme = useTheme();

    let item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type: PlannerType = "element" in item ? "characters" : "weapons";

    const mode = usePlannerCardMode();

    const levels = levelData["genshin"];

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
            icon: `genshin/weapons/icons/${item.weaponType}`,
        },
        {
            skillKey: "skill",
            levels: skillLevel,
            values: item.values.skill || defaultSkillValues,
            icon: `genshin/characters/talents/${splitJoin(
                item.name
            ).toLowerCase()}_skill`,
        },
        {
            skillKey: "burst",
            levels: skillLevel,
            values: item.values.burst || defaultSkillValues,
            icon: `genshin/characters/talents/${splitJoin(
                item.name
            ).toLowerCase()}_burst`,
        },
    ];

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("genshin", item.element)
            : theme.text.selected;

    const [Level, Attack, Skill, Ultimate] = sliders.map((slider) => (
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
        <MainContainer mode={mode}>
            <LevelSliderContainer mode={mode}>{Level}</LevelSliderContainer>
            {type === "characters" &&
                [Attack, Skill, Ultimate].map((slider) => (
                    <SkillSliderContainer key={slider.key} mode={mode}>
                        {slider}
                    </SkillSliderContainer>
                ))}
        </MainContainer>
    );
}
