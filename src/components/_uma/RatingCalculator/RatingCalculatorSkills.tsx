import { useEffect, useMemo, useState } from "react";

// Component imports
import RatingCalculatorSkillSelector from "./RatingCalculatorSkillSelector";
import RatingCalculatorSkill from "./RatingCalculatorSkill";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Switch from "@/components/Switch";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useUmaContext } from "@/context";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";
import { useStore, useServerStore, useRatingCalculatorStore } from "@/stores";
import {
    createSkillOptions,
    getUniqueSkill,
    sortSkills,
} from "@/helpers/uma/calculator";

// Type imports
import { UmaSkill } from "@/types/uma/skill";
import { UmaSkillOption } from "@/types/uma/calculator";

export default function RatingCalculatorSkills() {
    const { characters } = useTEHelperData();
    const { skills: skillList } = useUmaContext();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const selectedSkills = useStore(
        useRatingCalculatorStore,
        (state) => state.skills,
    );
    const {
        character,
        stats,
        skills,
        hiddenSkills,
        orderByInput,
        setSkills,
        setHiddenSkills,
        setOrderByInput,
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

    /**
     * When the selected character is changed,
     * remove their Unique Skill from the list of selected skills
     */
    useEffect(() => {
        const uniqueSkills = skillList.filter(
            (item) => item.unique === character,
        );
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
    }, [character]);

    const [uniqueSkill, setUniqueSkill] = useState<UmaSkillOption | null>(null);
    useEffect(() => {
        const skill = getUniqueSkill(characters, character, skillList, stats);
        if (skill) {
            setUniqueSkill(() => skill);
        }
    }, [character, stats[5]]);

    const options = useMemo(() => {
        return createSkillOptions(skillData);
    }, [skillData]);

    const handleSwitchChange = () => {
        setOrderByInput(!orderByInput);
    };

    let currentSkills = [...values];
    if (!orderByInput) {
        currentSkills = sortSkills(currentSkills);
    }

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
                        startIcon={<DeleteIcon />}
                    >
                        Clear All Skills
                    </Button>
                </FlexBox>
            </Stack>
            <Grid container spacing={2}>
                {uniqueSkill && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RatingCalculatorSkill
                            unique
                            skill={uniqueSkill}
                            options={options}
                            values={values}
                            handleChange={handleChange}
                        />
                    </Grid>
                )}
                {values.length > 0 &&
                    currentSkills.map((skill) => (
                        <Grid key={skill.id} size={{ xs: 12, md: 6 }}>
                            <RatingCalculatorSkill
                                skill={skill}
                                options={options}
                                values={values}
                                handleChange={handleChange}
                            />
                        </Grid>
                    ))}
            </Grid>
            <RatingCalculatorSkillSelector
                character={character}
                options={options}
                values={values}
                handleChange={handleChange}
            />
            <FlexBox spacing={2}>
                <Switch
                    checked={orderByInput}
                    onChange={handleSwitchChange}
                    size="small"
                />
                <Text variant="body2" weight="highlight">
                    Show Skills in Input Order
                </Text>
            </FlexBox>
        </Stack>
    );
}
