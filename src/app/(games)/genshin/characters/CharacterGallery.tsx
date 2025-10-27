"use client";

import { BaseSyntheticEvent, useState, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import InfoCard from "@/components/InfoCard";
import InfoAvatar from "@/components/InfoAvatar";

// MUI imports
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useView } from "@/hooks";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { filterItems } from "@/helpers/filters";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default function CharacterGallery({
    characters,
}: {
    characters: GenshinCharacter[];
}) {
    const game = useGameTag();

    const filters = useFilterStore(
        useShallow((state) => state["genshin/character"])
    );

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    characters = filterUnreleasedContent(
        hideUnreleasedContent,
        characters,
        game
    );

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const { view, handleView } = useView("icon");

    const params = {
        view,
        handleView,
        searchValue,
        handleInputChange,
    };

    const currentCharacters = useMemo(
        () => filterItems(characters, filters, searchValue),
        [characters, filters, searchValue]
    );

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
                                    weaponType: character.weapon,
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
            {renderGallery()}
        </InfoGallery>
    );
}
