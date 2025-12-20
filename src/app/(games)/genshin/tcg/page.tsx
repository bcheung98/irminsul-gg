import { Suspense } from "react";

// Component imports
import TCGGallery from "./TCGGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TCG",
    description: "A list of all Genshin Impact Genius Invocation TCG cards.",
};

export default async function Page() {
    return (
        <Suspense fallback={<Loader />}>
            <TCGGallery />
        </Suspense>
    );
}
