import { Suspense } from "react";

// Component imports
import SupportPage from "./SupportPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData, getDataSet, getUmaEvents } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { UmaCharacterProfile } from "@/types/uma/character";
import { UmaSkill } from "@/types/uma/skill";
import { EventList } from "@/types/uma/event";
import { UmaSupport } from "@/types/uma";

interface Props {
    params: Promise<{ support: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { support } = await params;
    const suppData = await getData<UmaSupport>(
        "uma/supports",
        (supp) => formatHref(supp.url) === formatHref(support)
    );

    return getMetadata({
        game: "uma",
        tag: "supports",
        attributes: {
            id: suppData.id,
            name: suppData.name,
            displayName: suppData.displayName,
            title: suppData.title,
            rarity: suppData.rarity,
            specialty: suppData.specialty,
        },
    });
}

export default async function Page({ params }: Props) {
    const { support } = await params;
    const suppData = await getData<UmaSupport>(
        "uma/supports",
        (supp) => formatHref(supp.url) === formatHref(support)
    );
    const profileData = await getData<UmaCharacterProfile>(
        "uma/character-profiles",
        (char) => suppData.charID === char.id
    );
    const skillData = await getDataSet<UmaSkill>("uma/skills");
    const commonEventData = await getUmaEvents("support-common");
    const ssrEventData = await getUmaEvents("support-ssr");
    const srEventData = await getUmaEvents("support-sr");
    const palEventData = await getUmaEvents("support-pal");
    const groupEventData = await getUmaEvents("support-group");

    const [
        supp,
        profile,
        skills,
        commonEvent,
        ssrEvent,
        srEvent,
        palEvent,
        groupEvent,
    ] = await Promise.all([
        suppData,
        profileData,
        skillData,
        commonEventData,
        ssrEventData,
        srEventData,
        palEventData,
        groupEventData,
    ]);

    const events: Partial<EventList> = {
        "support-common": commonEvent,
        "support-ssr": ssrEvent,
        "support-sr": srEvent,
        "support-pal": palEvent,
        "support-group": groupEvent,
    };

    return (
        <Suspense fallback={<Loader />}>
            <SupportPage
                support={supp}
                profile={profile}
                skills={skills}
                events={events}
            />
        </Suspense>
    );
}
