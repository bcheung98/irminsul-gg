import { genshinVersions } from "./genshin/versions";
import { hsrVersions } from "./hsr/versions";
import { umaVersions } from "./uma/versions";
import { wuwaVersions } from "./wuwa/versions";
import { zzzVersions } from "./zzz/versions";

interface VersionInfo {
    version: string;
    name: string;
}

interface Versions {
    [game: string]: VersionInfo[];
}

const versions: Versions = {
    genshin: genshinVersions,
    hsr: hsrVersions,
    wuwa: wuwaVersions,
    zzz: zzzVersions,
    uma: umaVersions,
};

export default versions;
