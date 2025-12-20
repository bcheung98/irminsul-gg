import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { HSRRelic } from "@/types/hsr";

export const metadata: Metadata = {
    title: "Relics",
    description: "A list of all Honkai: Star Rail Relics",
};

export default async function Page() {
    const equipment = await getDataSet<HSRRelic>("hsr/relics");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
