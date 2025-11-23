import type { Game, Server } from "@/types";

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
] as const;

export type Month = (typeof months)[number];

export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

export type Day = (typeof days)[number];

export const servers = {
    NA: "-5",
    EU: "+1",
    Asia: "+8",
};

function formatDate(date: string, offset: string) {
    return `${date
        .split(" ")
        .slice(0, 2)
        .join(" ")
        .replace(/-/g, "/")}${offset}`;
}

/**
 * @param value - A string representing a date.
 * The string must be formatted in the following way: `YYYY-MM-DD HH:MM:SS UTC+Z`.
 * @param server - The current server (NA / EU / Asia).
 * @param game - The current game.
 */
export default class DateObject {
    value: string;
    server: Server;
    game: Game | undefined;

    /**
     * @constructor
     */
    constructor(value: string, server?: Server, game?: Game) {
        this.value = value;
        this.server = server || "NA";
        this.game = game || "genshin";
    }

    /**
     * @private
     * Creates a new Date object from the given input.
     */
    private createDateObject() {
        let dateObject;
        if (this.value) {
            if (this.value.includes("UTC")) {
                dateObject = new Date(
                    formatDate(this.value, `+${this.value.split("+")[1]}`)
                );
            } else {
                let offset = servers[this.server];
                if (this.game === "uma" && this.server === "Asia") {
                    offset = "-5";
                }
                dateObject = new Date(formatDate(this.value, offset));
            }
        } else {
            dateObject = new Date();
        }
        return dateObject;
    }

    /**
     * @private
     * Splits a Date object into an array.
     */
    private createDateArray() {
        return this.createDateObject().toLocaleString().split(",");
    }

    /**
     * Returns the Date object.
     */
    get date() {
        return this.createDateObject();
    }

    /**
     * Returns the date in the `Month Day, Year` format.
     */
    get string() {
        const arr = this.createDateArray()[0].split("/");
        const month = months[Number(arr[0]) - 1];
        const day = parseInt(arr[1], 10).toString();
        const year = arr[2];
        return `${month} ${day}, ${year}`;
    }

    /**
     * Returns the timestamp of the date in the `HH:MM:SS` format.
     */
    get time() {
        const arr = this.createDateArray()[1].trim().split(" ");
        return `${arr[0].split(":").splice(0, 2).join(":")} ${arr[1]}`;
    }

    /**
     * Returns both the formatted date and time strings.
     */
    get timeString() {
        return `${this.string} ${this.time}`;
    }

    /**
     * Determines if the date is in the past, future, or today.
     * @returns
     * `-1` if the date is in the past.
     *
     * `0` if the date is today.
     *
     * `1` if the date is in the future.
     */
    get checkDate() {
        const date = this.createDateObject();
        const today = new Date();
        if (today > date) return -1;
        else if (today === date) return 0;
        else return 1;
    }

    /**
     * Returns true if today's date is between two given dates; otherwise, returns false.
     * @param start - Start date
     * @param end - End date
     */
    static inRange(start: Date, end: Date) {
        const today = new Date();
        return today >= start && today < end;
    }
}
