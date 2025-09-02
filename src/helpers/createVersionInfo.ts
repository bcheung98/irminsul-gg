import { Banner, VersionInfo } from "types/common";
import { UmaBanner, UmaVersionInfo } from "types/uma";

export function createVersionInfo({
    banners,
    game,
}: {
    banners?: Banner[];
    game: string;
}) {
    const versions: VersionInfo[] = [];
    const versionKeys: string[] = [];
    banners?.forEach((banner) => {
        if (!versionKeys.includes(banner.subVersion)) {
            versionKeys.push(banner.subVersion);
            const characters = banners
                .filter((b) => b.subVersion === banner.subVersion)
                .map((version) => version.fiveStars)
                .flat();
            versions.push({
                version: banner.version,
                subVersion: banner.subVersion,
                start: banner.start,
                end: banner.end,
                rateUps: characters,
            });
        }
    });
    // Generate future versions
    const lastVersion = versions.slice(-1)[0];
    let { version } = lastVersion;
    let start = new Date(lastVersion.end);
    let end = new Date(lastVersion.end);
    let startTime, startUTC, endTime, endUTC;
    for (let i = 0; i < 20; i++) {
        start.setDate(end.getDate() + 1);
        if (lastVersion.subVersion.endsWith(".1")) {
            end.setDate(end.getDate() + 42);
        } else {
            end.setDate(end.getDate() + 21);
        }
        if (i % 2 === 0) {
            version = incrementVersion(version, game);
            startTime = "11:00:00";
            startUTC = " UTC+8";
            endTime = "17:59:59";
            endUTC = "";
        } else {
            startTime = "18:00:00";
            startUTC = "";
            endTime = "14:59:59";
            endUTC = "";
        }
        versions.push({
            version: version,
            subVersion: `${version}.${(i % 2) + 1}`,
            start: `${
                start.toISOString().split("T")[0]
            } ${startTime}${startUTC}`,
            end: `${end.toISOString().split("T")[0]} ${endTime}${endUTC}`,
            rateUps: [],
            futureVersion: true,
        });
        start = new Date(end);
        end = new Date(end);
    }
    return versions;
}

export function createUmaVersionInfo({
    banners,
}: {
    banners?: UmaBanner[];
    game: string;
}) {
    const versions: UmaVersionInfo[] = [];
    const versionKeys: number[] = [];
    banners?.forEach((banner) => {
        if (!versionKeys.includes(banner.id) && banner.start !== "") {
            versionKeys.push(banner.id);
            versions.push({
                id: banner.id,
                version: "",
                subVersion: "",
                start: banner.start,
                end: banner.end,
                startJP: banner.startJP,
                endJP: banner.endJP,
                rateUps: banner.rateUps,
            });
        }
    });
    return versions;
}

function incrementVersion(version: string, game: string) {
    let main: number | string;
    let sub: number | string;
    let versionNumber: string;
    // Genshin specific
    if (game === "Genshin" && version.startsWith("Luna")) {
        const arr = version.split(" ");
        main = arr[0];
        const index = numerals.findIndex((i) => i === arr[1]);
        sub = numerals[index + 1];
        versionNumber = `${main} ${sub}`;
    } else {
        const arr = version.split(".");
        main = parseInt(arr[0]);
        sub = parseInt(arr[1]);
        if (sub < 8) {
            sub += 1;
        } else {
            main += 1;
            sub = 0;
        }
        versionNumber = `${main}.${sub}`;
    }

    // Game specific adjustments
    if (game === "Genshin" && versionNumber === "6.0") {
        return "Luna I";
    }
    if (game === "Genshin" && versionNumber === "Luna X") {
        return "6.0";
    }
    if (game === "ZZZ" && versionNumber === "1.8") {
        return "2.0";
    }

    return versionNumber;
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
