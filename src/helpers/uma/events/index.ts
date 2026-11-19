import {
    distances,
    grades,
    moods,
    specialties,
    strategies,
    terrain,
} from "@/data/uma/common";
import { scenarios } from "@/data/uma/scenarios";
import { countText } from "@/utils";
import { raceConditions } from "@/data/uma/races";
import { racetracks } from "@/data/uma/racetracks";
import { formatAptitude } from "../formatConditions";
import type { Server } from "@/types";
import type { UmaCharacterProfile } from "@/types/uma/character";
import type { EventDate, EventExtraProps, EventNames } from "@/types/uma/event";

export function getEventProps(props: EventExtraProps = {}) {
    return {
        year: props.year ?? 1,
        month: props.month ?? 1,
        half: props.half ?? 1,
        grade: props.grade ?? 0,
        gradeList: props.gradeList ?? [1, 2],
        distance: props.distance ?? 0,
        distanceList: props.distanceList ?? [0],
        strategy: props.strategy ?? 1,
        terrain: props.terrain ?? 1,
        length: props.length ?? 1600,
        trackName: props.trackName ?? 0,
        trackConds: props.trackConds ?? [0],
        position: props.position ?? 1,
        placement: props.placement ?? [1, 0],
        pop: props.pop ?? 1,
        stat: props.stat ?? 1,
        mood: props.mood ?? 3,
        moodList: props.moodList ?? [3, 4],
        eventName: props.eventName ?? 0,
        eventNumber: props.eventNumber ?? 1,
        eventOption: props.eventOption ?? 1,
        eventOptions: props.eventOptions ?? [1],
        eventOutcome: props.eventOutcome ?? 2,
        charName: props.charName ?? 0,
        charList: props.charList ?? [0],
        date: props.date ?? [1, 1, 1],
        dateRange: props.dateRange ?? [
            [1, 1, 1],
            [2, 2, 2],
        ],
        conditions: props.conditions ?? [],
    };
}

export function getOptionTag(index: number, length: number) {
    if (length > 1 && length < 4) {
        let tag = "";
        switch (index) {
            case 1:
                tag = "Top ";
                break;
            case 2:
                tag = length == 2 ? " Bottom " : "Middle ";
                break;
            case 3:
                tag = "Bottom ";
                break;
            default:
                break;
        }
        return tag + "Option:";
    } else if (length > 3) {
        return `Option ${index}:`;
    } else {
        return "";
    }
}

export function getCharacterName(
    id: string | number | undefined,
    profiles: UmaCharacterProfile[],
): string {
    if (typeof id === "string") return id;

    const character = profiles.find(
        (character) => character.id === Number(id || 0),
    );

    return character?.name || "";
}

export function getCharacterList(
    ids: number[],
    profiles: UmaCharacterProfile[],
): string {
    return ids.map((id) => ` ${getCharacterName(id, profiles)}`).join(",");
}

export function getTrainingType(t: string | number | undefined) {
    if (!t || typeof t === "number") return "";
    if (t in trainings) {
        return trainings[t];
    }
}

export function distOrTerrain(d?: number, t?: number) {
    if (d) {
        return getDistance(d);
    } else if (t) {
        return terrain[t - 1];
    } else {
        return "";
    }
}

export function distOrStyle(d?: number, s?: number) {
    if (d) {
        return getDistance(d);
    } else if (s) {
        return getStrategy(s);
    } else {
        return "";
    }
}

export function getScenario(s = 1) {
    return scenarios.find((scenario) => scenario.id === s)?.name || "";
}

export function getScenarioLink(id = 1) {
    return `※ Scenario link: This event will grant higher rewards in the ${getScenario(
        id,
    )} scenario.`;
}

export function formatRaceCount(
    count: number | number[] | undefined,
    single = "",
    multi = "$X times",
) {
    return Array.isArray(count)
        ? `${formatCount(count)} times`
        : countText({ count, single, multi });
}

export function formatCount(count?: number | number[]): string {
    if (count === undefined) return "";

    if (typeof count === "number") {
        return String(count);
    }

    const [min, max] = count;

    if (max === 0) {
        return `${min}+`;
    }

    return `${min}–${max}`;
}
export function getStat(s = 1) {
    return specialties[s - 1];
}

export function getDistance(d = 0) {
    return formatAptitude(distances[d]);
}

export function getStrategy(s = 1) {
    return formatAptitude(strategies[s - 1]);
}

export function getYear(y = 1) {
    return `${years[y - 1]} Year`;
}

export function getMonth(m = 1) {
    return months[m - 1];
}

export function getHalf(h = 1) {
    return times[h - 1];
}

export function getDate(d: EventDate) {
    const [y, m, h] = d;
    return `${getYear(y)}, ${getHalf(h)} ${getMonth(m)} `;
}

export function getGrade(g = 1) {
    return grades[g];
}

export function getMood(m = 3) {
    return moods[m - 1];
}

export function getTrackConditions(c = [1]) {
    return c
        .map((x, i) =>
            i < c.length - 1
                ? `${raceConditions[x]}, `
                : `or ${raceConditions[x]}`,
        )
        .join("");
}

export function getTrackName(t = 10001) {
    return racetracks[t];
}

export function getOptionList(o = [1]) {
    return o
        .map((x, i) => (i < o.length - 1 ? `#${x}, ` : `or #${x}`))
        .join("");
}

export function getEventName(
    events: EventNames[] | undefined,
    eventID: number,
    server: Server,
) {
    if (!events) return "";
    const e = events.find((event) => event.id === eventID);
    if (!e) return "";
    if (server === "Asia") return e.nameJP;
    return e.name;
}

export const years = ["Junior", "Classic", "Senior"];
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const times = ["Early", "Late"];

export const skillTypes: { [key: string]: string } = {
    speed: "Speed-type",
    lane: "Navigation-type",
    reco: "Recovery-type",
    accel: "Acceleration-type",
    green: "Green",
};

export const trainings: Record<string, string> = {
    sp: "Speed",
    st: "Stamina",
    po: "Power",
    gu: "Guts",
    in: "Wit",
};

export const eventOutcomes: { [key: number]: string } = {
    0: "bad",
    1: "average",
    2: "good",
    3: "best",
    23: "good or best",
};
