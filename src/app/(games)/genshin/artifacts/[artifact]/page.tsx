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
import { GenshinArtifact } from "@/types/genshin/artifact";

interface Props {
    params: Promise<{ artifact: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { artifact } = await params;
    const artifactData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact),
    );

    return artifactData
        ? getMetadata({
              game: "genshin",
              tag: "equipment",
              attributes: {
                  id: artifactData.id,
                  name: artifactData.name,
                  displayName: artifactData.displayName,
                  rarity: artifactData.rarity,
                  description: artifactData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { artifact } = await params;
    const artifactData = await getData<GenshinArtifact>(
        "genshin/artifacts",
        (a) => formatHref(a.url) === formatHref(artifact),
    );

    if (!artifactData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <EquipmentPage equipment={artifactData} />
        </Suspense>
    );
}
