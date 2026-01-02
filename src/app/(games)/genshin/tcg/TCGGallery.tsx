"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import TCGCard from "@/components/_genshin/TCGCard";
import Image from "@/components/Image";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useSettingsStore,
    useFilterStore,
} from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { GenshinTCGCard } from "@/types/genshin/tcg";

export default function TCGGallery(props: { cards: GenshinTCGCard[] }) {
    const game = "genshin";
    const tag = "genshin/tcg";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const cards = filterUnreleasedContent(
        hideUnreleasedContent,
        props.cards,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentCards, setCurrentCards] = useState<GenshinTCGCard[]>([]);

    useEffect(() => {
        startTransition(() => {
            let data = cards;
            if (sortParams.view === "icon") {
                data = data.filter((card) => card.id < 100000);
            } else {
                data = data.filter((card) => card.id >= 100000);
            }
            setCurrentCards(
                filterItems(game, data, filters, searchValue, sortParams)
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    const renderGallery = () => {
        if (loading) return <LinearProgress />;
        return (
            <Grid container spacing={3}>
                {currentCards.map((card) => (
                    <TCGCard
                        key={card.id}
                        id={card.id}
                        name={card.displayName}
                        hp={"hp" in card ? card.hp : undefined}
                        cost={card.cost}
                        href={card.url}
                    />
                ))}
            </Grid>
        );
    };

    const params = {
        view: sortParams.view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="TCG" {...params} customButtons={buttons}>
            {renderGallery()}
        </InfoGallery>
    );
}

const buttons = [
    {
        value: "icon",
        icon: <Image src="genshin/tcg/icons/CardType_Character" size={22} />,
        tooltip: "Character Cards",
    },
    {
        value: "card",
        icon: <Image src="genshin/tcg/icons/CardType_Action" size={22} />,
        tooltip: "Action Cards",
    },
];
