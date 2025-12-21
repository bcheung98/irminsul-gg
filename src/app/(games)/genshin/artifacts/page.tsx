import { Suspense } from "react";

// Component imports
import EquipmentGallery from "./EquipmentGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { GenshinArtifact } from "@/types/genshin/artifact";

export const metadata = getMetadata({ game: "genshin", tag: "equipment" });

export default async function Page() {
    const equipment = await getDataSet<GenshinArtifact>("genshin/artifacts");

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentGallery equipment={equipment} />
        </Suspense>
    );
}
