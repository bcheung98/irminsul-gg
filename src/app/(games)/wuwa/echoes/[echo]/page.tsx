import { Suspense } from "react";
import { notFound } from "next/navigation";

// Component imports
import EchoPage from "./EchoPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { WuWaEcho } from "@/types/wuwa";

interface Props {
    params: Promise<{ echo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { echo } = await params;
    const equipmentData = await getData<WuWaEcho>(
        "wuwa/echoes",
        (e) => formatHref(e.url) === formatHref(echo),
    );

    return equipmentData
        ? getMetadata({
              game: "wuwa",
              tag: "equipment",
              attributes: {
                  id: equipmentData.id,
                  name: equipmentData.name,
                  displayName: equipmentData.displayName,
                  rarity: equipmentData.rarity,
                  description: equipmentData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { echo } = await params;
    const equipmentData = await getData<WuWaEcho>(
        "wuwa/echoes",
        (e) => formatHref(e.url) === formatHref(echo),
    );

    if (!equipmentData) {
        notFound();
    }

    return (
        <Suspense fallback={<Loader />}>
            <EchoPage echo={equipmentData} />
        </Suspense>
    );
}
