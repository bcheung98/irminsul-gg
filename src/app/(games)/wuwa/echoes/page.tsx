import { Suspense } from "react";

// Component imports
import EchoGallery from "./EchoGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { WuWaEcho } from "@/types/wuwa";

export const metadata = getMetadata({ game: "wuwa", tag: "equipment" });

export default async function Page() {
    const echoes = await getDataSet<WuWaEcho>("wuwa/echoes");

    return (
        <Suspense fallback={<Loader />}>
            <EchoGallery echoes={echoes} />
        </Suspense>
    );
}
