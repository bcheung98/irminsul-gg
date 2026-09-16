"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    HSRCharacterInfoCard,
    HSRCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { HSRCharacter } from "@/types/hsr/character";

export default function CharacterGallery(props: {
    characters: HSRCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "hsr",
        galleryKey: "hsr/characters", // Pathname
        filterKey: "hsr/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <HSRCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <HSRCharacterInfoCardMaterial
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
        <InfoGallery title={categories["hsr/characters"]} {...params}>
            {gallery}
        </InfoGallery>
    );
}
