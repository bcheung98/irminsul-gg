import { Suspense } from "react";

// Component imports
import SupportGallery from "./SupportGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { UmaSupport } from "@/types/uma/support";

export const metadata = getMetadata({ game: "uma", tag: "supports" });

export default async function Page() {
    const supports = await getDataSet<UmaSupport>("uma/supports");

    return (
        <Suspense fallback={<Loader />}>
            <SupportGallery supports={supports} />
        </Suspense>
    );
}
