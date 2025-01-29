import { Banner, VersionInfo } from "types/common";

export function createVersionInfo({
    banners,
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
                characters: characters,
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
        end.setDate(end.getDate() + 21);
        if (i % 2 === 0) {
            version = incrementVersion(version);
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
            characters: [],
            futureVersion: true,
        });
        start = new Date(end);
        end = new Date(end);
    }
    return versions;
}

function incrementVersion(version: string) {
    const arr = version.split(".");
    let main = parseInt(arr[0]);
    let sub = parseInt(arr[1]);
    if (sub < 8) {
        sub += 1;
    } else {
        main += 1;
        sub = 0;
    }
    return `${main}.${sub}`;
}
