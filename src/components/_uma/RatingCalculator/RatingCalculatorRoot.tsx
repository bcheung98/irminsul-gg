"use client";

// Component imports
import RatingCalculator from "./RatingCalculator";

// Helper imports
import { UmaContext } from "@/context";
import { TEHelperDataContext } from "../TEHelper/TEHelper.utils";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";
import { UmaCharacterProfile } from "@/types/uma/character";

export default function RatingCalculatorRoot({
    characters,
    skills,
    profiles,
}: {
    characters: UmaCharacter[];
    skills: UmaSkill[];
    profiles: UmaCharacterProfile[];
}) {
    return (
        <UmaContext value={{ skills, events: {}, profiles }}>
            <TEHelperDataContext value={{ characters, supports: [] }}>
                <RatingCalculator />
            </TEHelperDataContext>
        </UmaContext>
    );
}
