import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { convertNametoURL } from "@/utils/utils";

// Type imports
import type { Metadata } from "next";
import { GenshinCharacter } from "../../_types/character";

interface Props {
    params: Promise<{ character: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { character } = await params;
    const charData = await getData<GenshinCharacter>(
        "genshin/characters",
        (char) => convertNametoURL(char.name) === convertNametoURL(character)
    );

    return {
        title: charData?.fullName,
        description: charData?.description,
        keywords: [charData.fullName, charData.name],
    };
}

export default async function GenshinCharacterPage({ params }: Props) {
    const { character } = await params;
    const charData = await getData<GenshinCharacter>(
        "genshin/characters",
        (char) => convertNametoURL(char.name) === convertNametoURL(character)
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
