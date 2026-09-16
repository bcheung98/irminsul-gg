"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { UmaCharacterInfoCard } from "@/components/InfoCard";
import CharacterList from "./CharacterList";

// Helper imports
import { categories } from "@/data/categories";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaCharacter } from "@/types/uma/character";

export default function CharacterGallery(props: {
    characters: UmaCharacter[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "uma",
        galleryKey: "uma/characters", // Pathname
        filterKey: "uma/characters", // Data tag
        items: props.characters,
        views: {
            icon: (character) => (
                <UmaCharacterInfoCard
                    key={character.id}
                    character={character}
                />
            ),
            list: (characters, isPending) => (
                <CharacterList characters={characters} loading={isPending} />
            ),
        },
        hideUnreleased: useStore(useServerStore, (state) => state.uma) === "NA",
    });

    return (
        <InfoGallery
            title={categories["uma/characters"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
