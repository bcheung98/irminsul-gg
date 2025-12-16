// Component imports
import SkillListRow from "./SkillListRow";

// MUI imports
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillList({
    skills,
    loading,
}: {
    skills: UmaSkill[];
    loading?: boolean;
}) {
    if (loading) return <LinearProgress />;

    return (
        <Card>
            {skills.map((skill, index) => (
                <SkillListRow key={skill.id} skill={skill} index={index} />
            ))}
        </Card>
    );
}
