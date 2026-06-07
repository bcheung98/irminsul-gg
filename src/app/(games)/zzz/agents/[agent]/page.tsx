import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

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
        (char) => formatHref(char.url) === formatHref(agent),
    );

    return charData
        ? getMetadata({
              game: "zzz",
              tag: "characters",
              attributes: {
                  id: charData.id,
                  name: charData.name,
                  displayName: charData.displayName,
                  rarity: charData.rarity,
                  element: charData.element,
                  subElement: charData.subElement,
                  weaponType: charData.weaponType,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { agent } = await params;
    const charData = await getData<ZZZCharacter>(
        "zzz/agents",
        (char) => formatHref(char.url) === formatHref(agent),
    );

    if (!charData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage character={charData} />
        </Suspense>
    );
}
