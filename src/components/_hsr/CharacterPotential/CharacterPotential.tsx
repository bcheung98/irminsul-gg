// Component imports
import ContentBox from "@/components/ContentBox";
import SkillCard from "@/components/SkillCard";
import CharacterSkillDescription from "@/components/CharacterSkills/CharacterSkillDescription";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import type { Skill, SkillKeyword } from "@/types/skill";
import type { AttributeData } from "@/types";

export default function CharacterPotential({
    potential,
    keywords,
    attributes,
}: {
    potential: Skill[];
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}) {
    return (
        <ContentBox header="EX Eidolons">
            <Stack spacing={2}>
                {potential.map((skill, index) => (
                    <SkillCard key={index}>
                        <CharacterSkillDescription
                            skill={skill}
                            skillKey="ex"
                            keywords={keywords}
                            attributes={attributes}
                            levels={[]}
                            handleSliderChange={() => {}}
                            index={index + 1}
                        />
                    </SkillCard>
                ))}
            </Stack>
        </ContentBox>
    );
}
