import { GameData } from "@/types";
import { genshinLevels } from "./genshin/levels";
import { hsrLevels } from "./hsr/levels";
import { wuwaLevels } from "./wuwa/levels";
import { zzzLevels } from "./zzz/levels";

const levels: GameData<(key: string, rarity?: number) => (string | number)[]> =
    {
        genshin: genshinLevels,
        hsr: hsrLevels,
        wuwa: wuwaLevels,
        zzz: zzzLevels,
        uma: function (key: string): (string | number)[] {
            throw new Error("Function not implemented.");
        },
    };

export default levels;
