import { Suspense } from "react";

// Component imports
import EquipmentPage from "./EquipmentPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { GenshinArtifact } from "@/types/genshin/artifact";

interface Props {
    params: Promise<{ artifact: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { artifact } = await params;
    const artifactData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact)
    );

    return {
        title: artifactData?.displayName,
        keywords: [artifactData.displayName, artifactData.name],
    };
}

export default async function GenshinArtifactPage({ params }: Props) {
    const { artifact } = await params;
    const artifactData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact)
    );

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={artifactData} />
        </Suspense>
    );
}
