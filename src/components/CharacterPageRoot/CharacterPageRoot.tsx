// Helper imports
import { SkillContext } from "@/app/context";

// Type imports
import { CharacterSkillsList } from "@/types/skill";
import InfoPageRoot, { InfoPageRootProps } from "../InfoPageRoot/InfoPageRoot";

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
