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

// Helper imports
import { sortBy } from "@/utils";
import { useUmaContext } from "@/context";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";
import { useStore, useServerStore, useRatingCalculatorStore } from "@/stores";

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

    function getUniqueSkill() {
        let skill = skillList.filter((skill) => skill.unique === character);
        const char = characters.find((char) => char.id === character);
        if ((char?.rarity || 3) < 3) {
            skill = skill.filter(
                (skill) => skill.rarity === (stats[5] < 3 ? 3 : 4),
            );
        }
        return createSkillOptions(skill)[0];
    }

    const [uniqueSkill, setUniqueSkill] = useState<UmaSkillOption | null>(null);
    useEffect(() => {
        const skill = getUniqueSkill();
        if (skill) {
            setUniqueSkill(() => skill);
        }
    }, [character, stats[5]]);

    const options = useMemo(() => {
        return createSkillOptions(skillData);
    }, [skillData]);

    const [orderByID, setOrderByID] = useState(false);
    const handleSwitchChange = () => {
        setOrderByID(!orderByID);
    };

    let currentSkills = [...values];
    if (!orderByID) {
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
                    checked={orderByID}
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

function createSkillOptions(skills: UmaSkill[]): UmaSkillOption[] {
    return skills.map((skill) => ({
        id: skill.id,
        name: skill.name.global,
        nameJP: skill.name.jp,
        nameJPNative: skill.name.jpNative,
        icon: skill.icon,
        rarity: skill.rarity,
        values: skill.values || [],
    }));
}

// Custom sort to emulate in-game sorting order
function sortSkills(skills: UmaSkillOption[]) {
    const skillTypes: Record<string, UmaSkillOption[]> = {
        special: [],
        passives: [],
        greens: [],
        other: [],
    };

    skills.forEach((skill) => {
        // Unique skills
        if ([3, 4, 5].includes(skill.rarity)) {
            skillTypes.passives.push(skill);
        } // Special case for Runaway
        else if (skill.icon === 40012) {
            skillTypes.special.push(skill);
        }
        // Green skills with no aptitude requirement (excluding Lone Wolf, Sympathy, Lucky Seven, and Restraint)
        else if (
            ![201631, 201632, 201641, 202161].includes(skill.id) &&
            skill.icon < 10061 &&
            skill.values[5] === ""
        ) {
            skillTypes.greens.push(skill);
        }
        // Everything else
        else {
            skillTypes.other.push(skill);
        }
    });

    return Object.values(skillTypes)
        .map((item) => item.sort((a, b) => sortBy(b.id, a.id)))
        .flat();
}
