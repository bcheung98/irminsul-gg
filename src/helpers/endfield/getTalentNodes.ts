import type { EndfieldCharacterPassive } from "@/types/endfield/character";

export function getTalentNodes(talents: EndfieldCharacterPassive[]) {
    return talents.flatMap((talent, talentIndex) =>
        talent.levels
            .filter((level) => level !== 0)
            .map((level) => ({
                talent,
                talentIndex,
                level,
            })),
    );
}
