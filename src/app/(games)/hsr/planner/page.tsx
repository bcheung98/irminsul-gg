import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { HSRCharacter, HSRWeapon } from "@/types/hsr";

export const metadata = getMetadata({
    overrides: plannerMetaData,
});

export default async function Page() {
    const characterData = await getDataSet<HSRCharacter>("hsr/characters");
    const weaponData = await getDataSet<HSRWeapon>("hsr/lightcones");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("hsr", item)),
        weaponData.map((item) => parseData("hsr", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
