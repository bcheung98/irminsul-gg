"use client";

// Component imports
import CharacterSplash from "@/components/CharacterSplash/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo/CharacterInfo";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Type imports
import { GenshinCharacter } from "../../_types/character";

export default function CharacterPage({
    character,
}: {
    character: GenshinCharacter;
}) {
    const splash = (
        <CharacterSplash name={character.name} outfits={character.outfits} />
    );
    const info = (
        <CharacterInfo
            name={character.fullName}
            title={character.title}
            icon={`genshin/elements/${character.element}`}
            description={character.description}
            data={{
                element: character.element,
                weapon: character.weapon,
                rarity: character.rarity,
            }}
        />
    );

    return (
        <Stack spacing={2}>
            <Grid container spacing={3}>
                <Grid size={4}>
                    <Stack spacing={2}>{splash}</Stack>
                </Grid>
                <Grid size="grow">
                    <Stack spacing={2}>{info}</Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}
