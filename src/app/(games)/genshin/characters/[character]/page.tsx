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
import { GenshinCharacter } from "@/types/genshin/character";

interface Props {
    params: Promise<{ character: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { character } = await params;
    const charData = await getData<GenshinCharacter>(
        "genshin/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );

    return getMetadata({
        game: "genshin",
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
    const { character } = await params;
    const charData = await getData<GenshinCharacter>(
        "genshin/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
