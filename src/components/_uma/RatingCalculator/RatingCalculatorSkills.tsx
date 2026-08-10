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
import { sortBy } from "@/utils";
import { useUmaContext } from "@/context";
import { useStore, useServerStore, useRatingCalculatorStore } from "@/stores";

// Type imports
import { UmaSkill } from "@/types/uma/skill";
import { UmaSkillOption } from "@/types/uma/calculator";

export default function RatingCalculatorSkills() {
    const { skills: skillList } = useUmaContext();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const selectedSkills = useStore(
        useRatingCalculatorStore,
        (state) => state.skills,
    );
    const {
        character: charID,
        skills,
        hiddenSkills,
        setSkills,
        setHiddenSkills,
    } = useRatingCalculatorStore();

    const [skillData, setSkillData] = useState<UmaSkill[]>([]);

    useEffect(() => {
        let items = [...skillList];
        items = items.filter((item) => item.rarity !== 3);
        if (hideUnreleasedContent) {
            items = items.filter((item) => item.global);
        }
        setSkillData(items);
    }, [skillList, server]);

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

    useEffect(() => {
        if (selectedSkills) {
            setValues(selectedSkills);
        }
    }, [selectedSkills]);

    // When the selected character is changed, remove their Unique Skill from the list of selected skills
    useEffect(() => {
        const uniqueSkills = skillList.filter((item) => item.unique === charID);
        uniqueSkills.forEach((skill) => {
            if (skill) {
                const index = skills.findIndex((item) => item.id === skill.id);
                if (index !== -1) {
                    const newValues = skills.toSpliced(index, 1);
                    setValues(() => newValues);
                    setSkills(newValues);
                }
                if (hiddenSkills.includes(skill.id)) {
                    setHiddenSkills(skill.id);
                }
            }
        });
    }, [charID]);

    const options = useMemo(() => {
        return createSkillOptions(skillData);
    }, [skillData]);

    return (
        <Stack spacing={2} sx={{ px: 1 }}>
            <Stack spacing={{ xs: 2, md: 1 }}>
                <FlexBox sx={{ justifyContent: "space-between" }}>
                    <Text variant="h6" weight="highlight">
                        Skills
                    </Text>
                    <Button
                        color="info"
                        variant="contained"
                        size="small"
                        onClick={clearInput}
                    >
                        Clear All Skills
                    </Button>
                </FlexBox>
            </Stack>
            {values.length > 0 && (
                <Grid container spacing={2}>
                    {[...values]
                        .sort((a, b) => sortBy(b.id, a.id))
                        .map((skill) => (
                            <Grid key={skill.id} size={{ xs: 12, md: 6 }}>
                                <RatingCalculatorSkill
                                    skill={skill}
                                    character={charID}
                                    options={options}
                                    values={values}
                                    handleChange={handleChange}
                                />
                            </Grid>
                        ))}
                </Grid>
            )}
            <RatingCalculatorSkillSelector
                character={charID}
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
        rarity: [3, 4, 5].includes(skill.rarity) ? 1 : skill.rarity,
        values: skill.values || [],
    }));
}
