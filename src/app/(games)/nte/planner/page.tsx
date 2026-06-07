import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { parseData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { NTECharacter, NTEWeapon } from "@/types/nte";

export const metadata = getMetadata({
    overrides: plannerMetaData,
});

export default async function Page() {
    const characterData = await getDataSet<NTECharacter>("nte/espers");
    const weaponData = await getDataSet<NTEWeapon>("nte/arcs");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => parseData("nte", item)),
        weaponData.map((item) => parseData("nte", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
