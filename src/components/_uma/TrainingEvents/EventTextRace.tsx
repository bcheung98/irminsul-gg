// Helper imports
import { useUmaContext } from "@/context";
import { renderEventTextRace } from "@/helpers/uma/events/renderEventTextRace";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventTextRace({ event }: { event: EventRewards }) {
    const { profiles } = useUmaContext();

    if (!isRaceTag(event.tag)) {
        return null;
    }

    return renderEventTextRace[event.tag](event, { profiles });
}

export function isRaceTag(tag: string): tag is keyof typeof renderEventTextRace {
    return Object.hasOwn(renderEventTextRace, tag);
}
