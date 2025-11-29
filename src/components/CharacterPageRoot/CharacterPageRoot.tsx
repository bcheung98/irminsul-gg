import { useState } from "react";

// Component imports
import InfoPageRoot, {
    InfoPageRootProps,
} from "@/components/InfoPageRoot/InfoPageRoot";

// MUI imports
import { SelectChangeEvent } from "@mui/material/Select";

// Helper imports
import { SkillContext, SkillVersionContext } from "@/context";

// Type imports
import { CharacterSkillsList } from "@/types/skill";

interface CharacterPageRootProps extends InfoPageRootProps {
    skills: CharacterSkillsList;
}

export default function CharacterPageRoot({
    skills,
    ...other
}: CharacterPageRootProps) {
    const indexes = ["v1"];
    const versions = [{ value: "v1", label: "Original" }];
    Object.values(skills).forEach((skillList) => {
        skillList?.forEach((skill) => {
            if (skill.version && !indexes.includes(skill.version.value)) {
                versions.unshift(skill.version);
                indexes.push(skill.version.value);
            }
        });
    });

    const [value, setValue] = useState(versions[0].value);
    const handleVersionChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    const buffs = {
        versions,
        value,
        onChange: handleVersionChange,
    };

    return (
        <SkillContext value={skills}>
            <SkillVersionContext value={buffs}>
                <InfoPageRoot {...other} />
            </SkillVersionContext>
        </SkillContext>
    );
}
