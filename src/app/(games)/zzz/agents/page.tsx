import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { ZZZCharacter } from "@/types/zzz/character";

export const metadata = getMetadata({ game: "zzz", tag: "characters" });

export default async function Page() {
    const characters = await getDataSet<ZZZCharacter>("zzz/agents");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
