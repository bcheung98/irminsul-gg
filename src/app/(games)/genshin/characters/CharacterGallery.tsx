"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import InfoCard, { InfoCardMaterial } from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
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
    const game = "genshin";
    const tag = "genshin/characters";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const characters = filterUnreleasedContent(
        hideUnreleasedContent,
        props.characters,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentCharacters, setCurrentCharacters] = useState<
        GenshinCharacter[]
    >([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentCharacters(
                filterItems(game, characters, filters, searchValue, sortParams)
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    const renderGallery = () => {
        switch (sortParams.view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentCharacters.map((character) => (
                            <InfoCard
                                tag={tag}
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
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentCharacters.map((character) => (
                            <InfoCardMaterial
                                tag={tag}
                                key={character.id}
                                name={character.name}
                                displayName={character.fullName}
                                rarity={character.rarity}
                                badgeLeft={{
                                    element: character.element,
                                    weaponType: character.weaponType,
                                }}
                                materials={character.materials}
                            />
                        ))}
                    </Grid>
                );
            case "list":
                return (
                    <CharacterList
                        characters={currentCharacters}
                        loading={loading}
                    />
                );
        }
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
        <InfoGallery title="Characters" {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
