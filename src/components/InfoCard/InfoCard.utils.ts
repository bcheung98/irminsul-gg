import { endfieldMainCharIDs } from "@/data/endfield/common";
import { wuwaMainCharIDs } from "@/data/wuwa/common";
import { nteMainCharIDs } from "@/data/nte/common";
import { Game, Gender } from "@/types";

export function getImageURL({
    game,
    tag,
    id,
    gender,
    url,
}: {
    game: Game;
    tag: string;
    id: number;
    gender: Gender;
    url?: string;
}) {
    let imgURL = `${tag}/${id}`;
    if (url) {
        imgURL = `${tag}/${url}`;
    } else if (game === "genshin" && id.toString().startsWith("10000005")) {
        imgURL = `${tag}/MC_${gender.slice(0, 1)}`;
    } else if (game === "hsr" && id.toString().startsWith("800")) {
        imgURL = `${tag}/${id}_${gender.slice(0, 1)}`;
    } else if (game === "wuwa" && wuwaMainCharIDs.includes(id)) {
        imgURL = `${tag}/MC_${gender.slice(0, 1)}`;
    } else if (game === "endfield" && endfieldMainCharIDs.includes(id)) {
        imgURL = `${tag}/${id}_${gender.slice(0, 1)}`;
    } else if (game === "nte" && nteMainCharIDs.includes(id)) {
        imgURL = `${tag}/${id}_${gender.slice(0, 1)}`;
    }
    return imgURL;
}
