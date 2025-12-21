import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";

export const metadata = getMetadata({
    overrides: plannerMetaData,
});

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
