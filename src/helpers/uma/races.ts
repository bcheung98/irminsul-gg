import { races } from "@/data/uma/races";
import { getOrdinal } from "@/utils";

export function getRace(id: number | string) {
    if (id === "debut") {
        return races[0];
    } else if (id === "maiden") {
        return races[1];
    } else {
        return races.find((race) => race.raceID === id);
    }
}

export function getRaceName(id: string) {
    if (id === "debut") {
        return races[0].name;
    } else if (id === "maiden") {
        return races[1].name;
    } else {
        let res = "";
        const [raceID, year] = id.split("|");
        if (raceID === "larc_rep") {
            return `${getOrdinal(
                Number(year)
            )} L'Arc Representative Exhibition Race`;
        } else if (["gur", "wbc", "swbc"].includes(raceID)) {
            return raceID.toLocaleUpperCase();
        } else {
            const race = races.find((race) => race.raceID === Number(raceID));
            if (race) {
                res = race.name;
                if (year) {
                    res += ` (Year ${year})`;
                }
            }
            return res;
        }
    }
}
