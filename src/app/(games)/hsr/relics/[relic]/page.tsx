import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { HSRRelic } from "@/types/hsr";

interface Props {
    params: Promise<{ relic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { relic } = await params;
    const relicData = await getData<HSRRelic>(
        "hsr/relics",
        (a) => formatHref(a.url) === formatHref(relic)
    );

    return {
        title: relicData?.displayName,
        keywords: [relicData.displayName, relicData.name],
    };
}

export default async function Page({ params }: Props) {
    const { relic } = await params;
    const relicData = await getData<HSRRelic>(
        "hsr/relics",
        (a) => formatHref(a.url) === formatHref(relic)
    );

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={relicData} />
        </Suspense>
    );
}
