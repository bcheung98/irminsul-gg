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
import { GenshinArtifact } from "@/types/genshin/artifact";

interface Props {
    params: Promise<{ artifact: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { artifact } = await params;
    const equipmentData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact),
    );

    return equipmentData
        ? getMetadata({
              game: "genshin",
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
    const { artifact } = await params;
    const equipmentData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact),
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
