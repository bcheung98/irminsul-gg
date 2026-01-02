import { Suspense } from "react";

// Component imports
import TCGPage from "./TCGPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData, getDataSet } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { TCGCharacterCard, TCGActionCard } from "@/types/genshin/tcg";
import { SkillKeyword } from "@/types/skill";

interface Props {
    params: Promise<{ card: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { card } = await params;
    const cardData = await getData<TCGCharacterCard>(
        "genshin/tcg",
        (c) => formatHref(c.url) === formatHref(card)
    );

    return getMetadata({
        game: "genshin",
        tag: "tcg",
        attributes: {
            id: cardData?.id,
            name: `${cardData?.name} (TCG)`,
            displayName: `${cardData?.displayName} (TCG)`,
        },
    });
}

export default async function Page({ params }: Props) {
    const { card } = await params;
    const cardData = await getData<TCGCharacterCard>(
        "genshin/tcg",
        (c) => formatHref(c.url) === formatHref(card)
    );
    const keywordData = await getDataSet<SkillKeyword>("genshin/tcg-keywords");

    return (
        <Suspense fallback={<Loader />}>
            <TCGPage card={cardData} keywords={keywordData} />
        </Suspense>
    );
}
