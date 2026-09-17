"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    GenshinCharacterInfoCard,
    GenshinCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";

export default function CharacterGallery(props: {
    characters: GenshinCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "genshin",
        galleryKey: "genshin/characters", // Pathname
        filterKey: "genshin/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <GenshinCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <GenshinCharacterInfoCardMaterial
                    key={character.id}
                    character={character}
                />
            ),
            list: (characters, isPending) => (
                <CharacterList characters={characters} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery title={categories["genshin/characters"]} {...params}>
            {gallery}
        </InfoGallery>
    );
}
