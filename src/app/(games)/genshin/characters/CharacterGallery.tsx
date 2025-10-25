"use client";

// Component imports
import InfoCard from "@/components/InfoCard";
import InfoAvatar from "@/components/InfoAvatar";

// MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default function CharacterGallery({
    characters,
}: {
    characters: GenshinCharacter[];
}) {
    return (
        <Box sx={{ px: { md: 1 } }}>
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
