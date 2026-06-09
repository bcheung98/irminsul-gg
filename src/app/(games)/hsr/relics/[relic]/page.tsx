import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData } from "@/api";
import { countText, formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { HSRRelic } from "@/types/hsr";

interface Props {
    params: Promise<{ relic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { relic } = await params;
    const equipmentData = await getData<HSRRelic>(
        "hsr/relics",
        (a) => formatHref(a.url) === formatHref(relic),
    );

    return equipmentData
        ? getMetadata({
              game: "hsr",
              tag: "equipment",
              attributes: {
                  id: equipmentData.id,
                  name: equipmentData.name,
                  displayName: equipmentData.displayName,
                  rarity: equipmentData.rarity,
                  description: equipmentData.description,
              },
              overrides: {
                  description: Object.entries(equipmentData.setEffect)
                      .map(
                          ([key, effect]) =>
                              `${key}-${countText({
                                  count: Number(key),
                                  single: "Piece",
                              })}: ${effect}`,
                      )
                      .join("\n"),
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { relic } = await params;
    const equipmentData = await getData<HSRRelic>(
        "hsr/relics",
        (a) => formatHref(a.url) === formatHref(relic),
    );

    if (!equipmentData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={equipmentData} />
        </Suspense>
    );
}
