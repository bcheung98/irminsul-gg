"server only";

import { getDataSet } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { SearchResult } from "./SiteSearch";
import { Game } from "@/types";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";

export async function getItems(game: Game): Promise<SearchResult[]> {
    const items = {
        "genshin/characters": await getDataSet<GenshinCharacter>(
            "genshin/characters"
        ),
        "genshin/weapons": await getDataSet<GenshinWeapon>("genshin/weapons"),
        "genshin/artifacts": await getDataSet<GenshinArtifact>(
            "genshin/artifacts"
        ),
    };
    return Object.entries(items)
        .map(([category, data]) =>
            data.map((item) => ({
                id: item.id,
                name: item.name,
                displayName:
                    "fullName" in item ? item.fullName : item.displayName,
                category: category,
                release: item.release,
                url: `/${category}/${formatHref(item.url)}`,
            }))
        )
        .flat()
        .filter((item) => item.category.startsWith(game));
}
