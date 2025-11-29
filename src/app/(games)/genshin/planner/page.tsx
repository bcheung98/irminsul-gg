import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";

// Type imports
import type { Metadata } from "next";
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";

export const metadata: Metadata = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export default async function Page() {
    const characterData = await getDataSet<GenshinCharacter>(
        "genshin/characters"
    );
    const weaponData = await getDataSet<GenshinWeapon>("genshin/weapons");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("genshin", item)),
        weaponData.map((item) => parseData("genshin", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
