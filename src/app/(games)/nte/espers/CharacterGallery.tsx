"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    NTECharacterInfoCard,
    NTECharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Type imports
import { NTECharacter } from "@/types/nte/character";

export default function CharacterGallery(props: {
    characters: NTECharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "nte",
        galleryKey: "nte/espers", // Pathname
        filterKey: "nte/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <NTECharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <NTECharacterInfoCardMaterial
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
        <InfoGallery title="Espers" {...params}>
            {gallery}
        </InfoGallery>
    );
}
