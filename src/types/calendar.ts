import type { Game } from ".";
import type { Banner } from "./banner";

export type CalendarView = "dayGridMonth" | "listMonth";

export interface CalendarVersionInfo extends Banner {
    isCurrent?: boolean;
    isFuture?: boolean;
}

export interface EventObject {
    id: string;
    title: string;
    start: string;
    end?: string;
    extendedProps: EventObjectExtendedProps;
}

export interface EventSourceObject {
    events: CalendarVersionInfo[];
    tag: string;
}

export interface EventObjectExtendedProps extends CalendarVersionInfo {
    game: Game;
    color: string;
}
