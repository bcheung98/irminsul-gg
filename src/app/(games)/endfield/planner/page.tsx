import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { parseData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";

export const metadata = getMetadata({
    overrides: plannerMetaData,
});

export default async function Page() {
    const characterData =
        await getDataSet<EndfieldCharacter>("endfield/operators");
    const weaponData = await getDataSet<EndfieldWeapon>("endfield/weapons");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("endfield", item)),
        weaponData.map((item) => parseData("endfield", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
