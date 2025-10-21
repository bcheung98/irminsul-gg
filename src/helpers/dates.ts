import type { Server } from "@/types";

const months = [
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

export default class DateObject {
    value: string;
    server: Server;

    constructor(value: string, server?: Server) {
        this.value = value;
        this.server = server || "NA";
    }

    createDateObject() {
        let dateObject;
        if (this.value) {
            if ([this.value].includes("UTC")) {
                dateObject = new Date(
                    formatDate(this.value, `+${this.value.split("+")[1]}`)
                );
            } else {
                dateObject = new Date(
                    formatDate(this.value, servers[this.server])
                );
            }
        } else {
            dateObject = new Date();
        }
        return dateObject;
    }

    createDateArray() {
        return this.createDateObject().toLocaleString().split(",");
    }

    get date() {
        return this.createDateObject();
    }

    get string() {
        const arr = this.createDateArray()[0].split("/");
        const month = months[Number(arr[0]) - 1];
        const day = parseInt(arr[1], 10).toString();
        const year = arr[2];
        return `${month} ${day}, ${year}`;
    }

    get time() {
        const arr = this.createDateArray()[1].trim().split(" ");
        return `${arr[0].split(":").splice(0, 2).join(":")} ${arr[1]}`;
    }

    get timeString() {
        return `${this.string} ${this.time}`;
    }

    static inRange(start: Date, end: Date) {
        const today = new Date();
        return today >= start && today < end;
    }
}
