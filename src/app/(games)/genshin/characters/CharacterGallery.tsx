"use client";

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

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default function CharacterGallery({
    characters,
}: {
    characters: GenshinCharacter[];
}) {
    const game = useGameTag();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    characters = filterUnreleasedContent(
        hideUnreleasedContent,
        characters,
        game
    );

    const { view, handleView } = useView("icon");

    const params = {
        view,
        handleView,
    };

    return (
        <InfoGallery title="Characters" {...params}>
            {view === "icon" && (
                <Grid container spacing={3}>
                    {characters.map((character) => (
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
            )}
            {view === "card" && (
                <Grid container spacing={3}>
                    {characters.map((character) => (
                        <InfoAvatar
                            tag="genshin/characters"
                            key={character.id}
                            name={character.name}
                            displayName={character.fullName}
                            rarity={character.rarity}
                        />
                    ))}
                </Grid>
            )}
        </InfoGallery>
    );
}
