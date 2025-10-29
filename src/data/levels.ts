import { genshinLevels } from "./genshin/levels";
import { GameData } from "@/types";

const levels: GameData<(key: string) => (string | number)[]> = {
    genshin: genshinLevels,
    hsr: function (key: string): (string | number)[] {
        throw new Error("Function not implemented.");
    },
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
