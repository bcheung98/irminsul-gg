// Helper imports
import { renderEventTextStatus } from "@/helpers/uma/events/renderEventTextStatus";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventTextStatus({ event }: { event: EventRewards }) {
    if (!isStatusTag(event.tag)) {
        return null;
    }

    return renderEventTextStatus[event.tag](event);
}

export function isStatusTag(tag: string): tag is keyof typeof renderEventTextStatus {
    return Object.hasOwn(renderEventTextStatus, tag);
}
