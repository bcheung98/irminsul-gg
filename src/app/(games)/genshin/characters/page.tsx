import { Suspense } from "react";

// Component imports
import CharacterBrowser from "./CharacterBrowser";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { GenshinCharacter } from "../_types/character";

export const metadata: Metadata = {
    title: "Characters",
    description: "A list of all Genshin Impact Characters",
};

export default async function GenshinCharactersPage() {
    const characters = await getDataSet<GenshinCharacter>(
        "https://api.irminsul.gg/genshin/characters.json"
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterBrowser characters={characters} />
        </Suspense>
    );
}
