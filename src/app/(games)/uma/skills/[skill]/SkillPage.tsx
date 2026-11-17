"use client";

// Component imports
import { InfoPageRoot } from "@/components/PageRoot";
import SkillPopup from "@/components/_uma/SkillPopup";

// Helper imports
import { UmaContext } from "@/context";

// Type imports
import type { UmaSkill } from "@/types/uma/skill";
import type { UmaCharacterEvoSkills } from "@/types/uma/character";

export default function SkillPage({
    skills,
    skill,
    evolutions,
}: {
    skills: UmaSkill[];
    skill: UmaSkill;
    evolutions: UmaCharacterEvoSkills[];
}) {
    return (
        <UmaContext value={{ skills, events: {}, profiles: [], evolutions }}>
            <InfoPageRoot>
                <SkillPopup skill={skill} showSources page />
            </InfoPageRoot>
        </UmaContext>
    );
}
