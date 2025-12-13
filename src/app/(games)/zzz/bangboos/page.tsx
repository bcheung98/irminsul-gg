import { Suspense } from "react";

// Component imports
import BangbooGallery from "./BangbooGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { ZZZBangboo } from "@/types/zzz";

export const metadata: Metadata = {
    title: "Bangboos",
    description: "A list of all Zenless Zone Zero Bangboos",
};

export default async function Page() {
    const bangboo = await getDataSet<ZZZBangboo>("zzz/bangboos");

    return (
        <Suspense fallback={<Loader />}>
            <BangbooGallery bangboo={bangboo} />
        </Suspense>
    );
}
