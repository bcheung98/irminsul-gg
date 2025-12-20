import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { GenshinCharacter } from "@/types/genshin/character";

export const metadata: Metadata = {
    title: "Characters",
    description: "A list of all Genshin Impact Characters",
};

export default async function Page() {
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
