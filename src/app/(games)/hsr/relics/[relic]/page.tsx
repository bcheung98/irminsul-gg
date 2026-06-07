import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

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
        (a) => formatHref(a.url) === formatHref(relic),
    );

    return relicData
        ? getMetadata({
              game: "hsr",
              tag: "equipment",
              attributes: {
                  id: relicData.id,
                  name: relicData.name,
                  displayName: relicData.displayName,
                  rarity: relicData.rarity,
                  description: relicData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { relic } = await params;
    const relicData = await getData<HSRRelic>(
        "hsr/relics",
        (a) => formatHref(a.url) === formatHref(relic),
    );

    if (!relicData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={relicData} />
        </Suspense>
    );
}
