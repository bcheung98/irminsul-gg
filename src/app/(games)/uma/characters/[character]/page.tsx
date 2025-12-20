import { Suspense } from "react";

// Component imports
import CharacterPage from "./CharacterPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData, getDataSet, getUmaEvents } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { UmaCharacter, UmaCharacterProfile } from "@/types/uma/character";
import { UmaSkill } from "@/types/uma/skill";
import { EventList } from "@/types/uma/event";

interface Props {
    params: Promise<{ character: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { character } = await params;
    const charData = await getData<UmaCharacter>(
        "uma/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );

    return {
        title: `${charData?.name} (${charData.outfit || "Original"})`,
        description: charData?.title,
        keywords: [
            charData?.name,
            charData?.title,
            charData?.outfit || "Original",
        ],
    };
}

export default async function Page({ params }: Props) {
    const { character } = await params;
    const charData = await getData<UmaCharacter>(
        "uma/characters",
        (char) => formatHref(char.url) === formatHref(character)
    );
    const profileData = await getData<UmaCharacterProfile>(
        "uma/character-profiles",
        (char) => charData.charID === char.id
    );
    const skillData = await getDataSet<UmaSkill>("uma/skills");
    const charEventData = await getUmaEvents("character");
    const charOutfitEventData = await getUmaEvents("character-outfit");

    const [char, profile, skills, charEvent, charOutfitEvent] =
        await Promise.all([
            charData,
            profileData,
            skillData,
            charEventData,
            charOutfitEventData,
        ]);

    const events: Partial<EventList> = {
        character: charEvent,
        "character-outfit": charOutfitEvent,
    };

    return (
        <Suspense fallback={<Loader />}>
            <CharacterPage
                character={char}
                profile={profile}
                skills={skills}
                events={events}
            />
        </Suspense>
    );
}
