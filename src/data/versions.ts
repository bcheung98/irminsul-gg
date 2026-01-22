import { GameData } from "@/types";
import { VersionInfo } from "@/types/version";
import { endfieldVersions } from "./endfield/versions";
import { genshinVersions } from "./genshin/versions";
import { hsrVersions } from "./hsr/versions";
import { umaVersions } from "./uma/versions";
import { wuwaVersions } from "./wuwa/versions";
import { zzzVersions } from "./zzz/versions";

const versions: GameData<VersionInfo[]> = {
    genshin: genshinVersions,
    hsr: hsrVersions,
    wuwa: wuwaVersions,
    zzz: zzzVersions,
    uma: umaVersions,
    endfield: endfieldVersions,
};

export default versions;
