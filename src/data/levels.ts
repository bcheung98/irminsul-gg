import { genshinLevels } from "./genshin/levels";
import { GameData } from "@/types";

const levels: GameData<(key: string) => (string | number)[]> = {
    genshin: genshinLevels,
};

export default levels;
