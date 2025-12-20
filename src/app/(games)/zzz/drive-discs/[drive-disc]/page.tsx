import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

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

    return {
        title: equipmentData?.displayName,
        keywords: [equipmentData.displayName, equipmentData.name],
    };
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
