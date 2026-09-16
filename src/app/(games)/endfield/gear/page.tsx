import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { EndfieldGear } from "@/types/endfield";

export const metadata = getMetadata({ game: "endfield", tag: "equipment" });

export default async function Page() {
    const equipment = await getDataSet<EndfieldGear>("endfield/gear");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
