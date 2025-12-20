import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { WuWaCharacter } from "@/types/wuwa";

export const metadata: Metadata = {
    title: "Resonators",
    description: "A list of all Wuthering Waves Resonators",
};

export default async function Page() {
    const characters = await getDataSet<WuWaCharacter>("wuwa/resonators");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
