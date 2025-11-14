"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import InfoCard from "@/components/InfoCard";
import InfoAvatar from "@/components/InfoAvatar";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useView } from "@/hooks";
import { useGalleryStore } from "@/stores/useGalleryStore";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default function CharacterGallery(props: {
    characters: GenshinCharacter[];
}) {
    const game = useGameTag();

    const filters = useFilterStore(
        useShallow((state) => state["genshin/characters"])
    );
    const sortParams = useGalleryStore(
        useShallow((state) => state["genshin/characters"])
    );

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const characters = filterUnreleasedContent(
        hideUnreleasedContent,
        props.characters,
        game
    );

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const { view } = useGalleryStore(
        useShallow((state) => state["genshin/characters"])
    );
    const handleView = useView("genshin/characters");

    const params = {
        view,
        handleView,
        searchValue,
        handleInputChange,
    };

    const [currentCharacters, setCurrentCharacters] = useState<
        GenshinCharacter[]
    >([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            const chars = filterItems(
                game,
                characters,
                filters,
                searchValue,
                sortParams
            );
            setCurrentCharacters(chars);
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    const renderGallery = () => {
        switch (view) {
            case "icon":
            default:
                return (
                    <Grid container spacing={3}>
                        {currentCharacters.map((character) => (
                            <InfoCard
                                tag="genshin/characters"
                                key={character.id}
                                name={character.name}
                                displayName={character.fullName}
                                rarity={character.rarity}
                                badgeLeft={{
                                    element: character.element,
                                    weaponType: character.weaponType,
                                }}
                            />
                        ))}
                    </Grid>
                );
            case "card":
                return (
                    <Grid container spacing={3}>
                        {currentCharacters.map((character) => (
                            <InfoAvatar
                                tag="genshin/characters"
                                key={character.id}
                                name={character.name}
                                displayName={character.fullName}
                                rarity={character.rarity}
                            />
                        ))}
                    </Grid>
                );
        }
    };

    return (
        <InfoGallery title="Characters" {...params}>
            {isPending ? <LinearProgress /> : renderGallery()}
        </InfoGallery>
    );
}
