import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { WuWaCharacter } from "@/types/wuwa";

export const metadata = getMetadata({ game: "wuwa", tag: "characters" });

export default async function Page() {
    const characters = await getDataSet<WuWaCharacter>("wuwa/resonators");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
