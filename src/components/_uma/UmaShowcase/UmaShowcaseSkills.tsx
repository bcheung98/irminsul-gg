// Component imports
import UmaShowcaseSkill from "./UmaShowcaseSkill";

// MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { useUmaContext } from "@/context";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";
import { getUniqueSkill, sortSkills } from "@/helpers/uma/calculator";

// Type imports
import { DataArray, UmaSkillOption } from "@/types/uma/calculator";

export default function UmaShowcaseSkills(props: {
    charID: number;
    skills: UmaSkillOption[];
    hiddenSkills: number[];
    stats: DataArray;
}) {
    const { characters } = useTEHelperData();
    const { skills: skillList } = useUmaContext();

    const skills = sortSkills(
        props.skills.filter((skill) => !props.hiddenSkills.includes(skill.id)),
    );
    skills.unshift(
        getUniqueSkill(characters, props.charID, skillList, props.stats),
    );

    return (
        <Box sx={{ backgroundColor: "rgb(242, 242, 242)", minHeight: "400px" }}>
            <Grid container spacing={1.5} sx={{ p: 2 }}>
                {skills.map((skill, index) => (
                    <Grid key={skill.id} size={6}>
                        <UmaShowcaseSkill skill={skill} unique={index === 0} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
