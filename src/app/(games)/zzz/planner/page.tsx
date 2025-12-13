import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";

// Type imports
import type { Metadata } from "next";
import { ZZZCharacter, ZZZWeapon } from "@/types/zzz";

export const metadata: Metadata = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export default async function Page() {
    const characterData = await getDataSet<ZZZCharacter>("zzz/agents");
    const weaponData = await getDataSet<ZZZWeapon>("zzz/w-engines");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("zzz", item)),
        weaponData.map((item) => parseData("zzz", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
