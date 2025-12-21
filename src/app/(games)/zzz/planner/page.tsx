import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { ZZZCharacter, ZZZWeapon } from "@/types/zzz";

export const metadata = getMetadata({
    overrides: plannerMetaData,
});

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
