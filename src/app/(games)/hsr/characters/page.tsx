import { Suspense } from "react";

// Component imports
import CharacterGallery from "./CharacterGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { HSRCharacter } from "@/types/hsr";

export const metadata: Metadata = {
    title: "Characters",
    description: "A list of all Honkai: Star Rail Characters",
};

export default async function Page() {
    const characters = await getDataSet<HSRCharacter>("hsr/characters");

    return (
        <Suspense fallback={<Loader />}>
            <CharacterGallery characters={characters} />
        </Suspense>
    );
}
