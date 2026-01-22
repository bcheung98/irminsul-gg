"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import {
    EndfieldCharacterInfoCard,
    EndfieldCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

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
import { EndfieldCharacter } from "@/types/endfield/character";

export default function CharacterGallery(props: {
    characters: EndfieldCharacter[];
}) {
    const game = "endfield";
    const tag = "endfield/characters";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(
        useShallow((state) => state["endfield/operators"]),
    );

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const characters = filterUnreleasedContent(
        hideUnreleasedContent,
        props.characters,
        game,
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentCharacters, setCurrentCharacters] = useState<
        EndfieldCharacter[]
    >([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentCharacters(
                filterItems(game, characters, filters, searchValue, sortParams),
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
                            <EndfieldCharacterInfoCard
                                key={character.id}
                                character={character}
                            />
                        ))}
                    </Grid>
                );
            case "card":
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentCharacters.map((character) => (
                            <EndfieldCharacterInfoCardMaterial
                                key={character.id}
                                character={character}
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
        handleView: useView("endfield/operators"),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Operators" {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
