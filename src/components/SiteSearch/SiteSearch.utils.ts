"use server";

import { getDataSet } from "@/lib/fetchData";
import { formatHref, splitJoin } from "@/utils";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { categories, categoryURLs } from "@/data/categories";
import { SearchResult } from "./SiteSearch";
import { Game } from "@/types";
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { HSRCharacter, HSRWeapon, HSRRelic } from "@/types/hsr";
import { WuWaCharacter, WuWaEcho, WuWaWeapon } from "@/types/wuwa";
import { ZZZBangboo, ZZZCharacter, ZZZDriveDisc, ZZZWeapon } from "@/types/zzz";
import { UmaCharacter, UmaSupport } from "@/types/uma";

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
        "hsr/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRCharacter>("hsr/characters"),
            "hsr"
        ),
        "hsr/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRWeapon>("hsr/lightcones"),
            "hsr"
        ),
        "hsr/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRRelic>("hsr/relics"),
            "hsr"
        ),
        "wuwa/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaCharacter>("wuwa/resonators"),
            "wuwa"
        ),
        "wuwa/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaWeapon>("wuwa/weapons"),
            "wuwa"
        ),
        "wuwa/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaEcho>("wuwa/echoes"),
            "wuwa"
        ),
        "zzz/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZCharacter>("zzz/agents"),
            "zzz"
        ),
        "zzz/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZWeapon>("zzz/w-engines"),
            "zzz"
        ),
        "zzz/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZDriveDisc>("zzz/drive-discs"),
            "zzz"
        ),
        "zzz/bangboos": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZBangboo>("zzz/bangboos"),
            "zzz"
        ),
        "uma/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<UmaCharacter>("uma/characters"),
            "uma"
        ),
        "uma/supports": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<UmaSupport>("uma/supports"),
            "uma"
        ),
    })
        .map(([category, data]) =>
            data.map((item) => ({
                id: item.id,
                name: item.name,
                displayName: item.displayName || item.name,
                rarity: item.rarity,
                outfit: "outfit" in item && item.outfit,
                specialty: "specialty" in item && item.specialty,
                category: category,
                release: item.release,
                url: `/${categoryURLs[category]}/${formatHref(item.url)}`,
            }))
        )
        .flat();
    if (game) {
        data = data.filter((item) => item.category.startsWith(game));
    }
    return data;
}
