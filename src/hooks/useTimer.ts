import { useEffect, useState } from "react";
import DateObject from "@/helpers/dates";

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

type TimeUnit = "years" | "days" | "hours" | "minutes" | "seconds";

interface Timer {
    timeString: string;
    timeRemaining: number;
    timeArray: number[];
}

/**
 * Takes a target date and returns a formatted string counting down/up to that date.
 * @param date - Date to count down/up from.
 * @param compact - If true, the timer will only display the largest remaining unit of time.
 * @param endAtZero - If true, the timer will stop when it hits 0.
 * @param hideUnits - Units to omit from the formatted timer.
 * @returns
 * `timeString`: A constantly updating string representing the timer.
 *
 * `timeRemaining`: The difference in milliseconds between `date` and now.
 *
 * `timeArray`: An array of the individual units of time from `timeString`.
 * Can be broken down into `years`, `days`, `hours`, `minutes`, `seconds`.
 */
export function useTimer(
    date?: DateObject | string | number | null,
    compact = false,
    endAtZero = false,
    hideUnits: readonly TimeUnit[] = [],
): Timer {
    const startDate =
        typeof date === "number"
            ? date
            : date instanceof DateObject
              ? date.date.getTime()
              : new DateObject(date).date.getTime();

    const getTimeRemaining = () => {
        const diff = startDate - Date.now();
        if (endAtZero) {
            return Math.max(diff, 0);
        }
        return Math.abs(diff);
    };

    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);

    useEffect(() => {
        const updateTimer = () => {
            const remaining = getTimeRemaining();
            setTimeRemaining(remaining);
            return remaining;
        };
        if (updateTimer() === 0 && endAtZero) {
            return;
        }
        const interval = setInterval(() => {
            if (updateTimer() === 0 && endAtZero) {
                clearInterval(interval);
            }
        }, SECOND);
        return () => clearInterval(interval);
    }, [startDate, endAtZero]);

    const years = Math.floor(timeRemaining / YEAR);
    const days = Math.floor((timeRemaining % YEAR) / DAY);
    const hours = Math.floor((timeRemaining % DAY) / HOUR);
    const minutes = Math.floor((timeRemaining % HOUR) / MINUTE);
    const seconds = Math.floor((timeRemaining % MINUTE) / SECOND);

    const units = [
        ["years", years],
        ["days", days],
        ["hours", hours],
        ["minutes", minutes],
        ["seconds", seconds],
    ] as const;

    const visibleUnits = units.filter(([unit]) => !hideUnits.includes(unit));

    const firstVisibleIndex = visibleUnits.findIndex(([, value]) => value > 0);

    const displayUnits = visibleUnits.slice(
        firstVisibleIndex === -1
            ? Math.max(visibleUnits.length - 1, 0)
            : firstVisibleIndex,
    );

    const timeString =
        displayUnits.length === 0
            ? ""
            : compact
              ? (() => {
                    const [unit, value] = displayUnits[0];
                    return `${value} ${value === 1 ? unit.slice(0, -1) : unit}`;
                })()
              : displayUnits
                    .map(([unit, value]) => `${value}${unit[0]}`)
                    .join(" ");

    return {
        timeString,
        timeRemaining,
        timeArray: [years, days, hours, minutes, seconds],
    };
}
