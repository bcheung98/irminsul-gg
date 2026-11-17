import type { EventList, EventNames } from "@/types/uma/event";

export function getCharacterEventNames(
    events: Partial<EventList>,
): EventNames[] {
    return Object.values(events)
        .flat()
        .map((event) => event.events)
        .map((event) => Object.values(event))
        .flat(2)
        .map((event) => ({
            id: event.id,
            name: event.name,
            nameJP: event.nameJP,
        }));
}
