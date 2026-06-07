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
import { EndfieldCharacter } from "@/types/endfield/character";

interface Props {
    params: Promise<{ operator: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { operator } = await params;
    const charData = await getData<EndfieldCharacter>(
        "endfield/operators",
        (char) => formatHref(char.url) === formatHref(operator),
    );

    return charData
        ? getMetadata({
              game: "endfield",
              tag: "characters",
              attributes: {
                  id: charData.id,
                  name: charData.name,
                  displayName: charData.displayName,
                  rarity: charData.rarity,
                  element: charData.element,
                  weaponType: charData.weaponType,
                  specialty: charData.specialty,
                  description: charData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { operator } = await params;
    const charData = await getData<EndfieldCharacter>(
        "endfield/operators",
        (char) => formatHref(char.url) === formatHref(operator),
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
