import { Suspense } from "react";

// Component imports
import Planner from "@/components/Planner";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { createPlannerItemData } from "@/helpers/planner";
import { getMetadata, plannerMetaData } from "@/helpers/metadata";

// Type imports
import { NTECharacter, NTEWeapon } from "@/types/nte";

export const metadata = getMetadata({
    overrides: plannerMetaData("nte"),
});

export default async function Page() {
    const characterData = await getDataSet<NTECharacter>("nte/espers");
    const weaponData = await getDataSet<NTEWeapon>("nte/arcs");

    const [characters, weapons] = await Promise.all([
        characterData.map((item) => createPlannerItemData("nte", item)),
        weaponData.map((item) => createPlannerItemData("nte", item)),
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <Planner characters={characters} weapons={weapons} />
        </Suspense>
    );
}
