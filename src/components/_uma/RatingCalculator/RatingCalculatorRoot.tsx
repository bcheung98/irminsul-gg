"use client";

// Component imports
import RatingCalculator from "./RatingCalculator";

// Helper imports
import { UmaContext } from "@/context";
import { TEHelperDataContext } from "../TEHelper/TEHelper.utils";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";

export default function RatingCalculatorRoot({
    characters,
    skills,
}: {
    characters: UmaCharacter[];
    skills: UmaSkill[];
}) {
    return (
        <UmaContext value={{ skills, events: {}, profiles: [] }}>
            <TEHelperDataContext value={{ characters, supports: [] }}>
                <RatingCalculator />
            </TEHelperDataContext>
        </UmaContext>
    );
}
