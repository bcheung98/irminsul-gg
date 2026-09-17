"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    EndfieldCharacterInfoCard,
    EndfieldCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { EndfieldCharacter } from "@/types/endfield/character";

export default function CharacterGallery(props: {
    characters: EndfieldCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "endfield",
        galleryKey: "endfield/operators", // Data tag
        filterKey: "endfield/characters", // Pathname
        items: props.characters,
        views: {
            icon: (character) => (
                <EndfieldCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <EndfieldCharacterInfoCardMaterial
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
        <InfoGallery title={categories["endfield/characters"]} {...params}>
            {gallery}
        </InfoGallery>
    );
}
