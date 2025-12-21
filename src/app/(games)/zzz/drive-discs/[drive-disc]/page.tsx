import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { ZZZDriveDisc } from "@/types/zzz";

interface Props {
    params: Promise<{ "drive-disc": string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { "drive-disc": disc } = await params;
    const equipmentData = await getData<ZZZDriveDisc>(
        "zzz/drive-discs",
        (a) => formatHref(a.url) === formatHref(disc)
    );

    return getMetadata({
        game: "zzz",
        tag: "equipment",
        attributes: {
            id: equipmentData.id,
            name: equipmentData.name,
            displayName: equipmentData.displayName,
            rarity: equipmentData.rarity,
            description: equipmentData.description,
        },
    });
}

export default async function Page({ params }: Props) {
    const { "drive-disc": disc } = await params;
    const equipmentData = await getData<ZZZDriveDisc>(
        "zzz/drive-discs",
        (a) => formatHref(a.url) === formatHref(disc)
    );

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={equipmentData} />
        </Suspense>
    );
}
