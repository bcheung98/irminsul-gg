// Helper imports
import { renderEventTextSkill } from "@/helpers/uma/events/renderEventTextSkill";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventTextSkill({ event }: { event: EventRewards }) {
    if (!isSkillTag(event.tag)) {
        return null;
    }

    return renderEventTextSkill[event.tag](event);
}

export function isSkillTag(tag: string): tag is keyof typeof renderEventTextSkill {
    return Object.hasOwn(renderEventTextSkill, tag);
}
