"use client";

// Component imports
import InfoCard from "@/components/InfoCard";
import InfoAvatar from "@/components/InfoAvatar";

// MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useStore } from "@/hooks";
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

    return (
        <Box sx={{ px: 1 }}>
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
            {/* <Grid container spacing={3}>
                {characters.map((character) => (
                    <InfoAvatar
                        tag="genshin/characters"
                        key={character.id}
                        name={character.name}
                        displayName={character.fullName}
                        rarity={character.rarity}
                        url="avatars"
                    />
                ))}
            </Grid> */}
        </Box>
    );
}
