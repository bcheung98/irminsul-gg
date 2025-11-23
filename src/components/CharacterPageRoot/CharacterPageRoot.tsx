// Helper imports
import { SkillContext } from "@/context";

// Type imports
import { CharacterSkillsList } from "@/types/skill";
import InfoPageRoot, { InfoPageRootProps } from "@/components/InfoPageRoot/InfoPageRoot";

interface CharacterPageRootProps extends InfoPageRootProps {
    skills: CharacterSkillsList;
}

export default function CharacterPageRoot({
    skills,
    ...other
}: CharacterPageRootProps) {
    return (
        <SkillContext value={skills}>
            <InfoPageRoot {...other} />
        </SkillContext>
    );
}
