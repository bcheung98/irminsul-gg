import { useEffect, useMemo, useState } from "react";

// Component imports
import RatingCalculatorSkillSelector from "./RatingCalculatorSkillSelector";
import RatingCalculatorSkill from "./RatingCalculatorSkill";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Helper imports
import { useUmaContext } from "@/context";
import { useStore, useServerStore, useRatingCalculatorStore } from "@/stores";

// Type imports
import { UmaSkill } from "@/types/uma/skill";
import { UmaSkillOption } from "@/types/uma/calculator";

export default function RatingCalculatorSkills() {
    const { skills } = useUmaContext();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const selectedSkills = useStore(
        useRatingCalculatorStore,
        (state) => state.skills,
    );
    const { character, hiddenSkills, setSkills, setHiddenSkills } =
        useRatingCalculatorStore();

    const [skillData, setSkillData] = useState<UmaSkill[]>([]);

    useEffect(() => {
        let items = [...skills];
        if (hideUnreleasedContent) {
            items = items.filter((item) => item.global);
        }
        setSkillData(items);
    }, [skills, server]);

    const [values, setValues] = useState<UmaSkillOption[]>([]);
    const handleChange = (newValue: UmaSkillOption[] | null) => {
        if (newValue) {
            setValues(() => newValue as UmaSkillOption[]);
            setSkills(newValue);
            const newHidden = hiddenSkills.filter(
                (skill) => !newValue.map((item) => item.id).includes(skill),
            );
            newHidden.forEach((skill) => setHiddenSkills(skill));
        }
    };
    const clearInput = () => {
        setValues(() => []);
        setSkills([]);
        hiddenSkills.forEach((skill) => setHiddenSkills(skill));
    };

    const options = useMemo(() => {
        return createSkillOptions(skillData);
    }, [skillData]);

    useEffect(() => {
        if (selectedSkills) {
            setValues(selectedSkills);
        }
    }, [selectedSkills]);

    function ResetSkills() {
        return (
            <Button
                color="info"
                variant="contained"
                size="small"
                onClick={clearInput}
            >
                Clear All Skills
            </Button>
        );
    }

    return (
        <Stack spacing={2} sx={{ px: 1 }}>
            <Stack spacing={{ xs: 2, md: 1 }}>
                <FlexBox sx={{ justifyContent: "space-between" }}>
                    <Text variant="h6" weight="highlight">
                        Skills
                    </Text>
                    <ResetSkills />
                </FlexBox>
            </Stack>
            {values.length > 0 && (
                <Grid container spacing={2}>
                    {values.map((skill) => (
                        <Grid key={skill.id} size={{ xs: 12, md: 6 }}>
                            <RatingCalculatorSkill skill={skill} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <RatingCalculatorSkillSelector
                character={character}
                options={options}
                values={values}
                handleChange={handleChange}
            />
        </Stack>
    );
}

function createSkillOptions(skills: UmaSkill[]): UmaSkillOption[] {
    return skills.map((skill) => ({
        id: skill.id,
        name: skill.name.global,
        nameJP: skill.name.jp,
        nameJPNative: skill.name.jpNative,
        icon: skill.icon,
        rarity: skill.rarity === 5 ? 1 : skill.rarity,
        values: skill.values || [],
    }));
}
