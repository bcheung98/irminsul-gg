import { Suspense } from "react";

// Component imports
import VersionHighlights from "@/components/VersionHighlights";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default async function GenshinHome() {
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");

    return (
        <Suspense fallback={<Loader />}>
            <VersionHighlights characters={characters} />
        </Suspense>
    );
}
