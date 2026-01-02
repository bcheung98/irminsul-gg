import { Suspense } from "react";

// Component imports
import TCGGallery from "./TCGGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { TCGCharacterCard } from "@/types/genshin/tcg";

export const metadata: Metadata = {
    title: "TCG",
    description: "A list of all Genshin Impact Genius Invocation TCG cards.",
};

export default async function Page() {
    const cards = await getDataSet<TCGCharacterCard>("genshin/tcg");

    return (
        <Suspense fallback={<Loader />}>
            <TCGGallery cards={cards} />
        </Suspense>
    );
}
