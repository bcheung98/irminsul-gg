import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { ZZZCharacter } from "@/types/zzz/character";

interface Props {
    params: Promise<{ agent: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { agent } = await params;
    const charData = await getData<ZZZCharacter>(
        "zzz/agents",
        (char) => formatHref(char.url) === formatHref(agent)
    );

    return {
        title: charData?.displayName,
        description: charData?.description,
        keywords: [charData.displayName, charData.name],
    };
}

export default async function Page({ params }: Props) {
    const { agent } = await params;
    const charData = await getData<ZZZCharacter>(
        "zzz/agents",
        (char) => formatHref(char.url) === formatHref(agent)
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
