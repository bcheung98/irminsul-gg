"use client";

// Component imports
import CharacterSplash from "@/components/CharacterSplash";
import CharacterInfo from "@/components/CharacterInfo";
import CharacterSkills from "@/components/CharacterSkills";
import CharacterPassives from "@/components/_genshin/CharacterPassives";
import CharacterUpgrades from "@/components/CharacterUpgrades";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { AttributeData } from "@/types/_common";

export default function CharacterPage({
    character,
}: {
    character: GenshinCharacter;
}) {
    const attributes: AttributeData = {
        name: character.name,
        displayName: character.fullName,
        title: character.title,
        description: character.description,
        element: character.element,
        weaponType: character.weapon,
        rarity: character.rarity,
        arkhe: character.arkhe,
    };

    const splash = (
        <CharacterSplash name={character.name} outfits={character.outfits} />
    );
    const info = (
        <CharacterInfo
            stats={character.stats}
            materials={character.materials}
            attributes={attributes}
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
                attributes={attributes}
            />
            <CharacterPassives
                passives={character.passives}
                attributes={attributes}
            />
            <CharacterUpgrades
                title="Constellation"
                upgrades={character.constellation}
                attributes={attributes}
            />
        </Stack>
    );
}
