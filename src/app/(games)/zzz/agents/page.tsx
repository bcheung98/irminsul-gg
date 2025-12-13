import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { ZZZCharacter } from "@/types/zzz/character";

export const metadata: Metadata = {
    title: "Agents",
    description: "A list of all Zenless Zone Zero Agents",
};

export default async function Page() {
    const characters = await getDataSet<ZZZCharacter>("zzz/agents");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
