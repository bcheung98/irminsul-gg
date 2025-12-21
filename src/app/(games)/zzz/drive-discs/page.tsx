import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { ZZZDriveDisc } from "@/types/zzz";

export const metadata = getMetadata({ game: "zzz", tag: "equipment" });

export default async function Page() {
    const equipment = await getDataSet<ZZZDriveDisc>("zzz/drive-discs");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
