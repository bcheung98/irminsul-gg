import { Suspense } from "react";

// Component imports
import EchoGallery from "./EchoGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { WuWaEcho } from "@/types/wuwa";

export const metadata: Metadata = {
    title: "Echoes",
    description: "A list of all Wuthering Waves Echoes",
};

export default async function Page() {
    const echoes = await getDataSet<WuWaEcho>("wuwa/echoes");

    return (
        <Suspense fallback={<Loader />}>
            <EchoGallery echoes={echoes} />
        </Suspense>
    );
}
