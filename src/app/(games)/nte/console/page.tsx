import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { NTECartridge } from "@/types/nte";

export const metadata = getMetadata({ game: "nte", tag: "equipment" });

export default async function Page() {
    const equipment = await getDataSet<NTECartridge>("nte/cartridges");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
