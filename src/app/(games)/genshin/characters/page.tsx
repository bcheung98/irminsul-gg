import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export const metadata = getMetadata({ game: "genshin", tag: "characters" });

export default async function Page() {
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
