import { Suspense } from "react";

// Component imports
import EndfieldHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";

export default async function Page() {
    const characterData = await getDataSet<EndfieldCharacter>(
        "endfield/operators"
    );
    const weaponData = await getDataSet<EndfieldWeapon>("endfield/weapons");

    const [characters, weapons] = await Promise.all([
        characterData,
        weaponData,
    ]);

    return (
        <Suspense fallback={<Loader />}>
            <EndfieldHome characters={characters} weapons={weapons} />
        </Suspense>
    );
}
