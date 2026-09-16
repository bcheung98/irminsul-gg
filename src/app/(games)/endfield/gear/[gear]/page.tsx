import { Suspense } from "react";
import { notFound } from "next/navigation";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { EndfieldGear } from "@/types/endfield";

interface Props {
    params: Promise<{ gear: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { gear } = await params;
    const equipmentData = await getData<EndfieldGear>(
        "endfield/gear",
        (a) => formatHref(a.url) === formatHref(gear),
    );

    return equipmentData
        ? getMetadata({
              game: "endfield",
              tag: "equipment",
              attributes: {
                  id: equipmentData.id,
                  name: equipmentData.name,
                  displayName: equipmentData.displayName,
                  rarity: equipmentData.rarity,
                  description: equipmentData.description,
              },
              overrides: {
                  description: "",
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { gear } = await params;
    const equipmentData = await getData<EndfieldGear>(
        "endfield/gear",
        (i) => formatHref(i.url) === formatHref(gear),
    );
    if (!equipmentData) {
        notFound();
    }

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage gear={equipmentData} />
        </Suspense>
    );
}
