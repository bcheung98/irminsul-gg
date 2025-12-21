import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { HSRCharacter } from "@/types/hsr";

export const metadata = getMetadata({ game: "hsr", tag: "characters" });

export default async function Page() {
    const characters = await getDataSet<HSRCharacter>("hsr/characters");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
