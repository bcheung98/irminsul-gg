import { Suspense } from "react";

// Component imports
import TEHelper from "@/components/_uma/TEHelper";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet, getUmaEvents } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";
import { EventList } from "@/types/uma/event";
import { UmaCharacterProfile } from "@/types/uma/character";

export const metadata: Metadata = {
    title: "Training Event Helper",
    description: "Tool for viewing Training Events in Umamusume.",
};

export default async function Page() {
    const characterData = await getDataSet<UmaCharacter>("uma/characters");
    const supportData = await getDataSet<UmaSupport>("uma/supports");
    const profileData = await getDataSet<UmaCharacterProfile>(
        "uma/character-profiles"
    );
    const skillData = await getDataSet<UmaSkill>("uma/skills");
    const charEventData = await getUmaEvents("character");
    const charOutfitEventData = await getUmaEvents("character-outfit");
    const commonEventData = await getUmaEvents("support-common");
    const ssrEventData = await getUmaEvents("support-ssr");
    const srEventData = await getUmaEvents("support-sr");
    const palEventData = await getUmaEvents("support-pal");
    const groupEventData = await getUmaEvents("support-group");
    const scenarioEventData = await getUmaEvents("scenario");

    const [
        characters,
        supports,
        profiles,
        skills,
        charEvent,
        charOutfitEvent,
        commonEvent,
        ssrEvent,
        srEvent,
        palEvent,
        groupEvent,
        scenarioEvent,
    ] = await Promise.all([
        characterData,
        supportData,
        profileData,
        skillData,
        charEventData,
        charOutfitEventData,
        commonEventData,
        ssrEventData,
        srEventData,
        palEventData,
        groupEventData,
        scenarioEventData,
    ]);

    const events: EventList = {
        character: charEvent,
        "character-outfit": charOutfitEvent,
        "support-common": commonEvent,
        "support-ssr": ssrEvent,
        "support-sr": srEvent,
        "support-pal": palEvent,
        "support-group": groupEvent,
        scenario: scenarioEvent,
    };

    return (
        <Suspense fallback={<Loader />}>
            <TEHelper
                characters={characters}
                supports={supports}
                profiles={profiles}
                skills={skills}
                events={events}
            />
        </Suspense>
    );
}
