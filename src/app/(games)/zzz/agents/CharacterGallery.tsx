"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    ZZZCharacterInfoCard,
    ZZZCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { ZZZCharacter } from "@/types/zzz/character";

export default function CharacterGallery(props: {
    characters: ZZZCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "zzz",
        galleryKey: "zzz/agents", // Pathname
        filterKey: "zzz/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <ZZZCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <ZZZCharacterInfoCardMaterial
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
        <InfoGallery title={categories["zzz/characters"]} {...params}>
            {gallery}
        </InfoGallery>
    );
}
