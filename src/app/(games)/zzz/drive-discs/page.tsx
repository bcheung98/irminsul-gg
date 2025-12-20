import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { ZZZDriveDisc } from "@/types/zzz";

export const metadata: Metadata = {
    title: "Drive Discs",
    description: "A list of all Zenless Zone Zero Drive Discs",
};

export default async function Page() {
    const equipment = await getDataSet<ZZZDriveDisc>("zzz/drive-discs");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
