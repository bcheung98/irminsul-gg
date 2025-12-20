import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";

// Type imports
import type { Metadata } from "next";
import { WuWaCharacter, WuWaWeapon } from "@/types/wuwa";

export const metadata: Metadata = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export default async function Page() {
    const characterData = await getDataSet<WuWaCharacter>("wuwa/resonators");
    const weaponData = await getDataSet<WuWaWeapon>("wuwa/weapons");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("wuwa", item)),
        weaponData.map((item) => parseData("wuwa", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
