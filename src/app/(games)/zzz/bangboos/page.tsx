import { Suspense } from "react";

// Component imports
import BangbooGallery from "./BangbooGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { ZZZBangboo } from "@/types/zzz";

export const metadata = getMetadata({ game: "zzz", tag: "bangboos" });

export default async function Page() {
    const bangboo = await getDataSet<ZZZBangboo>("zzz/bangboos");

    return (
        <Suspense fallback={<Loader />}>
            <BangbooGallery bangboo={bangboo} />
        </Suspense>
    );
}
