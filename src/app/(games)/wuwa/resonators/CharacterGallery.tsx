"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import {
    WuWaCharacterInfoCard,
    WuWaCharacterInfoCardMaterial,
} from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { WuWaCharacter } from "@/types/wuwa/character";

export default function CharacterGallery(props: {
    characters: WuWaCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "wuwa",
        galleryKey: "wuwa/resonators", // Pathname
        filterKey: "wuwa/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <WuWaCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            card: (character) => (
                <WuWaCharacterInfoCardMaterial
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
        <InfoGallery title={categories["wuwa/characters"]} {...params}>
            {gallery}
        </InfoGallery>
    );
}
