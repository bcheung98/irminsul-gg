import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { GenshinArtifact } from "@/types/genshin/artifact";

export const metadata: Metadata = {
    title: "Artifacts",
    description: "A list of all Genshin Impact Artifacts",
};

export default async function Page() {
    const equipment = await getDataSet<GenshinArtifact>("genshin/artifacts");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
