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
import { WuWaCharacter } from "@/types/wuwa/character";

interface Props {
    params: Promise<{ resonator: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { resonator } = await params;
    const charData = await getData<WuWaCharacter>(
        "wuwa/resonators",
        (char) => formatHref(char.url) === formatHref(resonator)
    );

    return getMetadata({
        game: "wuwa",
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
    const { resonator } = await params;
    const charData = await getData<WuWaCharacter>(
        "wuwa/resonators",
        (char) => formatHref(char.url) === formatHref(resonator)
    );

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
