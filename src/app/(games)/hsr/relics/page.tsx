import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { HSRRelic } from "@/types/hsr";

export const metadata = getMetadata({ game: "hsr", tag: "equipment" });

export default async function Page() {
    const equipment = await getDataSet<HSRRelic>("hsr/relics");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
