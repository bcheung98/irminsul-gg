import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { NTECharacter } from "@/types/nte/character";

interface Props {
    params: Promise<{ esper: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { esper } = await params;
    const charData = await getData<NTECharacter>(
        "nte/espers",
        (char) => formatHref(char.url) === formatHref(esper),
    );

    return getMetadata({
        game: "nte",
        tag: "characters",
        attributes: {
            id: charData.id,
            name: charData.name,
            displayName: charData.displayName,
            rarity: charData.rarity,
            element: charData.element,
            weaponType: charData.weaponType,
            description: charData.description,
        },
    });
}

export default async function Page({ params }: Props) {
    const { esper } = await params;
    const charData = await getData<NTECharacter>(
        "nte/espers",
        (char) => formatHref(char.url) === formatHref(esper),
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
