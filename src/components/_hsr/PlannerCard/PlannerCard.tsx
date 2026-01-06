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
import { useTextColor } from "@/helpers/styles";
import levelData from "@/data/levels";
import {
    usePlannerCardData,
    usePlannerCardMode,
} from "@/components/PlannerCardRoot/PlannerCard.utils";
import { characterTraceIDs } from "@/data/hsr/characterTraceIDs";

// Type imports
import { CostSliderValues, PlannerType } from "@/types/planner";
import { HSRWeaponType } from "@/types/hsr";

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
            skillKey: "elation",
            levels: skillLevel,
            values: item.values.elation || defaultSkillValues,
            icon: `hsr/skills/${item.id}_elation`,
        },
        {
            skillKey: "memo-skill",
            levels: atkLevel,
            values: item.values["memo-skill"] || defaultAtkValues,
            icon: `hsr/skills/${item.id}_memo_skill`,
        },
        {
            skillKey: "memo-talent",
            levels: atkLevel,
            values: item.values["memo-talent"] || defaultAtkValues,
            icon: `hsr/skills/${item.id}_memo_talent`,
        },
    ];

    const nodes = Object.fromEntries(
        characterTraceIDs[item.weaponType as HSRWeaponType].map((node) => [
            `trace-${node}`,
            item.values[`trace-${node}`] || defaultNodeValues,
        ])
    );

    const textColor = useTextColor(theme.text);
    const color =
        type === "characters"
            ? textColor("hsr", item.element)
            : theme.text.selected;

    const [
        Level,
        Attack,
        Skill,
        Ultimate,
        Talent,
        Elation,
        MemoSkill,
        MemoTalent,
    ] = sliders.map((slider) => (
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
                    [Attack, Skill, Ultimate, Talent].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
                {type === "characters" &&
                    item.weaponType === "Elation" &&
                    [Elation].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
                {type === "characters" &&
                    item.weaponType === "Remembrance" &&
                    [MemoSkill, MemoTalent].map((slider) => (
                        <SkillSliderContainer key={slider.key} mode={mode}>
                            {slider}
                        </SkillSliderContainer>
                    ))}
            </MainContainer>
            {type === "characters" && (
                <FlexBox spacing={[2, 4]} sx={{ px: 1 }} wrap>
                    {item.traces &&
                        item.traces.map((trace, index) => (
                            <StatNode
                                key={`${String.fromCharCode(index + 65)}-1`}
                                id={`${String.fromCharCode(index + 65)}-1`}
                                mode={mode}
                                trace={trace}
                                values={nodes}
                                attributes={{ ...item }}
                            />
                        ))}
                </FlexBox>
            )}
        </Stack>
    );
}
