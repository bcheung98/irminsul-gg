import { genshinLevels } from "./genshin/levels";

const levels: { [game: string]: (key: string) => (string | number)[] } = {
    genshin: genshinLevels,
};

export default levels;
