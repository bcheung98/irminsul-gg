import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { UmaCharacter } from "@/types/uma/character";

export const metadata = getMetadata({ game: "uma", tag: "characters" });

export default async function Page() {
    const characters = await getDataSet<UmaCharacter>("uma/characters");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
