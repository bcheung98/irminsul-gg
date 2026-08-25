"use client";

// Component imports
import InfoPageRoot from "@/components/InfoPageRoot";
import SkillPopup from "@/components/_uma/SkillPopup";

// Helper imports
import { UmaContext } from "@/context";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillPage({
    skills,
    skill,
}: {
    skills: UmaSkill[];
    skill: UmaSkill;
}) {
    return (
        <UmaContext value={{ skills, events: {}, profiles: [] }}>
            <InfoPageRoot>
                <SkillPopup skill={skill} showSources page />
            </InfoPageRoot>
        </UmaContext>
    );
}
