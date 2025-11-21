"server only";

import { getDataSet } from "@/lib/fetchData";
import { formatHref, splitJoin } from "@/utils";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { categories } from "@/data/categories";
import { SearchResult } from "./SiteSearch";
import { Game } from "@/types";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";

export async function getItems(
    hideUnreleasedContent = true,
    game?: Game
): Promise<SearchResult[]> {
    let data = Object.entries({
        "genshin/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinCharacter>("genshin/characters"),
            "genshin"
        ),
        "genshin/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinWeapon>("genshin/weapons"),
            "genshin"
        ),
        "genshin/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinArtifact>("genshin/artifacts"),
            "genshin"
        ),
    })
        .map(([category, data]) =>
            data.map((item) => ({
                id: item.id,
                name: item.name,
                displayName:
                    "fullName" in item ? item.fullName : item.displayName,
                category: category,
                release: item.release,
                url: `/${category.split("/")[0]}/${splitJoin(
                    categories[category],
                    " ",
                    "-"
                ).toLowerCase()}/${formatHref(item.url)}`,
            }))
        )
        .flat();
    if (game) {
        data = data.filter((item) => item.category.startsWith(game));
    }
    return data;
}
