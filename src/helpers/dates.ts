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

export const regions = {
    NA: "-5",
    EU: "+1",
    Asia: "+8",
};
export type Region = keyof typeof regions;

export interface DateObject {
    obj: Date;
    date: string;
    time: string;
}

export function createDateObject({
    date,
    region = "NA",
}: {
    date: string;
    region?: Region;
}): DateObject {
    let dateObj, dateString, timestamp;
    if (date) {
        const formatDate = (date: string, offset: string) =>
            `${date
                .split(" ")
                .slice(0, 2)
                .join(" ")
                .replace(/-/g, "/")}${offset}`;
        if (date.endsWith("UTC+8")) {
            dateObj = new Date(formatDate(date, "+8"));
        } else {
            dateObj = new Date(formatDate(date, regions[region]));
        }
    } else {
        dateObj = new Date();
    }

    const arr = dateObj.toLocaleString().split(",");

    const dateArr = arr[0].split("/");
    const month = months[Number(dateArr[0]) - 1];
    const day = parseInt(dateArr[1], 10).toString();
    const year = dateArr[2];
    dateString = `${month} ${day}, ${year}`;

    const timeArr = arr[1].trim().split(" ");
    timestamp = `${timeArr[0].split(":").splice(0, 2).join(":")} ${timeArr[1]}`;

    return {
        obj: dateObj,
        date: dateString,
        time: timestamp,
    };
}

export function isCurrentBanner(start: Date, end: Date) {
    const today = new Date();
    return today >= start && today < end;
}
