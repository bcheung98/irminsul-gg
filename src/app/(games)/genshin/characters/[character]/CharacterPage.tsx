"use client";

// Component imports
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterPassives from "@/components/_genshin/CharacterPassives";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

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
            stats={character.stats}
            materials={character.materials}
            attributes={{
                element: character.element,
                weaponType: character.weapon,
                rarity: character.rarity,
                arkhe: character.arkhe,
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
            <CharacterSkills
                title="Combat Talents"
                skills={character.skills}
                materials={character.materials}
                attributes={{
                    name: character.name,
                    element: character.element,
                    weaponType: character.weapon,
                }}
            />
            <CharacterPassives
                passives={character.passives}
                attributes={{
                    name: character.name,
                    element: character.element,
                }}
            />
        </Stack>
    );
}
