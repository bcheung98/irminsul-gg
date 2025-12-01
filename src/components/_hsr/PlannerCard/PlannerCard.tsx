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

export default function HSRPlannerCard() {
    const theme = useTheme();

    let item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type: PlannerType = "element" in item ? "characters" : "weapons";

    const mode = usePlannerCardMode();

    const levels = levelData["hsr"];

    const itemLevel = levels("level-asc", item.rarity);
    const atkLevel = levels("attack", item.rarity);
    const skillLevel = levels("skill", item.rarity);

    const defaultLevelValues: CostSliderValues = {
        start: 1,
        stop: itemLevel.length,
        selected: true,
    };

    const defaultAtkValues: CostSliderValues = {
        start: 1,
        stop: atkLevel.length,
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
            levels: atkLevel,
            values: item.values.attack || defaultAtkValues,
            icon: `hsr/skills/${item.id}_skill`,
        },
        {
            skillKey: "skill",
            levels: skillLevel,
            values: item.values.skill || defaultSkillValues,
            icon: `hsr/skills/${item.id}_skill`,
        },
        {
            skillKey: "ultimate",
            levels: skillLevel,
            values: item.values.ultimate || defaultSkillValues,
            icon: `hsr/skills/${item.id}_ultimate`,
        },
        {
            skillKey: "talent",
            levels: skillLevel,
            values: item.values.talent || defaultSkillValues,
            icon: `hsr/skills/${item.id}_talent`,
        },
        {
            skillKey: "memo-skill",
            levels: atkLevel,
            values: item.values.skill || defaultAtkValues,
            icon: `hsr/skills/${item.id}_memo_skill`,
        },
        {
            skillKey: "memo-talent",
            levels: atkLevel,
            values: item.values.skill || defaultAtkValues,
            icon: `hsr/skills/${item.id}_memo_talent`,
        },
    ];

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("hsr", item.element)
            : theme.text.selected;

    const [Level, Attack, Skill, Ultimate, Talent, MemoSkill, MemoTalent] =
        sliders.map((slider) => (
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
                [Attack, Skill, Ultimate, Talent].map((slider) => (
                    <SkillSliderContainer key={slider.key} mode={mode}>
                        {slider}
                    </SkillSliderContainer>
                ))}
            {item.weaponType === "Remembrance" &&
                [MemoSkill, MemoTalent].map((slider) => (
                    <SkillSliderContainer key={slider.key} mode={mode}>
                        {slider}
                    </SkillSliderContainer>
                ))}
        </MainContainer>
    );
}
