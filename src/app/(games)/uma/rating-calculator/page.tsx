import { Suspense } from "react";

// Component imports
import RatingCalculatorRoot from "@/components/_uma/RatingCalculator";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { parseCSV } from "@/utils/parseCSV";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";
import { UmaCharacterProfile } from "@/types/uma/character";

export const metadata = getMetadata({
    overrides: {
        title: "Rating Calculator",
        description:
            "Tool for calculating ratings in Umamusume using stats, aptitudes, unique level, and selected skills.",
    },
});

export default async function Page() {
    const characterData = await getDataSet<UmaCharacter>("uma/characters");
    const skillData = await getDataSet<UmaSkill>("uma/skills");
    const profileData = await getDataSet<UmaCharacterProfile>(
        "uma/character-profiles",
    );

    const [characters, skills, profiles] = await Promise.all([
        characterData,
        skillData,
        profileData,
    ]);

    try {
        const response = await fetch(
            "https://daftuyda.moe/assets/uma_skills.csv",
        );
        const csvText = await response.text();
        const rows = parseCSV(csvText).slice(1);
        skills.forEach((skill) => {
            let row = rows
                .filter(
                    (row) =>
                        (skill.name.global ||
                            skill.name.jp ||
                            skill.name.jpNative) === row[1],
                )
                .flat();
            if (row) {
                skill.values = row.slice(4, 10);
            }
        });
    } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
    }

    return (
        <Suspense fallback={<Loader />}>
            <RatingCalculatorRoot {...{ characters, skills, profiles }} />
        </Suspense>
    );
}
