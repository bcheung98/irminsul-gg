import { genshinLevels } from "./genshin/levels";
import { hsrLevels } from "./hsr/levels";
import { GameData } from "@/types";

const levels: GameData<(key: string, rarity?: number) => (string | number)[]> =
    {
        genshin: genshinLevels,
        hsr: hsrLevels,
        wuwa: function (key: string): (string | number)[] {
            throw new Error("Function not implemented.");
        },
        zzz: function (key: string): (string | number)[] {
            throw new Error("Function not implemented.");
        },
        uma: function (key: string): (string | number)[] {
            throw new Error("Function not implemented.");
        },
    };

export default levels;
