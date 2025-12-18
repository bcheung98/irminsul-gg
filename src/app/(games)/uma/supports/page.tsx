import { Suspense } from "react";

// Component imports
import SupportGallery from "./SupportGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { UmaSupport } from "@/types/uma/support";

export const metadata: Metadata = {
    title: "Support Cards",
    description: "A list of all Umamusume Support Cards",
};

export default async function Page() {
    const supports = await getDataSet<UmaSupport>("uma/supports");

    return (
        <Suspense fallback={<Loader />}>
            <SupportGallery supports={supports} />
        </Suspense>
    );
}
