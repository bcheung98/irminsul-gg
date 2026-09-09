import { wuwaMainCharIDs } from "@/data/wuwa/common";
import { endfieldMainCharIDs } from "@/data/endfield/common";
import { nteMainCharIDs } from "@/data/nte/common";
import { Game, Gender } from "@/types";
import { categoryURLs } from "@/data/categories";

const WUWA_MC_IDS = new Set(wuwaMainCharIDs.map((id) => id.toString()));
const ENDFIELD_MC_IDS = new Set(endfieldMainCharIDs.map((id) => id.toString()));
const NTE_MC_IDS = new Set(nteMainCharIDs.map((id) => id.toString()));

function isMainCharID(id: string, game: Game) {
    if (game === "genshin") return id.startsWith("10000005");
    if (game === "hsr") return id.startsWith("800");
    if (game === "wuwa") return WUWA_MC_IDS.has(id);
    if (game === "endfield") return ENDFIELD_MC_IDS.has(id);
    if (game === "nte") return NTE_MC_IDS.has(id);
    return false;
}

function addIndex(icon: string, splash: string, index = 0) {
    if (index) {
        if (!icon.includes("_")) icon += "_";
        icon += `${index}`;
        splash += `${index}`;
    }
    return { icon, splash };
}

export function getCharacterImageURLs({
    game,
    id,
    gender,
    index = 0,
    variant,
}: {
    game: Game;
    id: number;
    gender: Gender;
    index?: number;
    variant?: string;
}) {
    const mc = isMainCharID(id.toString(), game);
    gender = gender.slice(0, 1) as Gender;

    let icon = `${id}`;
    let splash = `${id}_splash`;

    const tag = categoryURLs[`${game}/characters`];

    switch (game) {
        case "genshin":
            if (mc) {
                icon = `MC_${gender}`;
                splash = `MC_${gender}_splash`;
            }
            if (variant) icon += `_${variant}`;
            break;
        case "hsr":
        case "endfield":
        case "nte":
            if (mc) {
                icon = `${id}_${gender}`;
                if (index) icon += "_";
                splash = `${id}_${gender}_splash`;
            }
            break;
        case "wuwa":
            splash = `${id}_${variant}`;
            if (mc) {
                icon = `MC_${gender}`;
                if (index) icon += "_";
                splash = `MC_${gender}_${variant}`;
            }
            break;
        case "zzz":
        case "uma":
        default:
            break;
    }
    return addIndex(`${tag}/${icon}`, `${tag}/${splash}`, index);
}
