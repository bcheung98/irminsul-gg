"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { UmaCharacterInfoCard } from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useFilterStore,
    useServerStore,
} from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { UmaCharacter } from "@/types/uma";

export default function CharacterGallery(props: {
    characters: UmaCharacter[];
}) {
    const game = "uma";
    const tag = "uma/characters";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const characters = filterUnreleasedContent(
        hideUnreleasedContent,
        props.characters,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentCharacters, setCurrentCharacters] = useState<UmaCharacter[]>(
        []
    );

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
                            <UmaCharacterInfoCard
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
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery
            title="Characters"
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {renderGallery()}
        </InfoGallery>
    );
}
