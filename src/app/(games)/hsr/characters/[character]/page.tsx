import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { HSRCharacter } from "@/types/hsr/character";

interface Props {
    params: Promise<{ character: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { character } = await params;
    const charData = await getData<HSRCharacter>(
        "hsr/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );

    return {
        title: charData?.displayName,
        description: charData?.description,
        keywords: [charData.displayName, charData.name],
    };
}

export default async function Page({ params }: Props) {
    const { character } = await params;
    const charData = await getData<HSRCharacter>(
        "hsr/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
