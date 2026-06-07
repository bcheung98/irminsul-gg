"use server";

import { getDataSet } from "@/api";
import { formatHref } from "@/utils";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { categoryURLs } from "@/data/categories";
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
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";
import { NTECharacter, NTEWeapon } from "@/types/nte";

export async function getItems(
    hideUnreleasedContent = true,
    game?: Game,
    hideUmaJPContent = true,
    pathname?: string,
): Promise<SearchResult[]> {
    let data = Object.entries({
        "genshin/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinCharacter>("genshin/characters"),
            "genshin",
            pathname,
        ),
        "genshin/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinWeapon>("genshin/weapons"),
            "genshin",
            pathname,
        ),
        "genshin/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<GenshinArtifact>("genshin/artifacts"),
            "genshin",
            pathname,
        ),
        "hsr/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRCharacter>("hsr/characters"),
            "hsr",
            pathname,
        ),
        "hsr/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRWeapon>("hsr/lightcones"),
            "hsr",
            pathname,
        ),
        "hsr/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<HSRRelic>("hsr/relics"),
            "hsr",
            pathname,
        ),
        "wuwa/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaCharacter>("wuwa/resonators"),
            "wuwa",
            pathname,
        ),
        "wuwa/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaWeapon>("wuwa/weapons"),
            "wuwa",
            pathname,
        ),
        "wuwa/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<WuWaEcho>("wuwa/echoes"),
            "wuwa",
            pathname,
        ),
        "zzz/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZCharacter>("zzz/agents"),
            "zzz",
            pathname,
        ),
        "zzz/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZWeapon>("zzz/w-engines"),
            "zzz",
            pathname,
        ),
        "zzz/equipment": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZDriveDisc>("zzz/drive-discs"),
            "zzz",
            pathname,
        ),
        "zzz/bangboos": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<ZZZBangboo>("zzz/bangboos"),
            "zzz",
            pathname,
        ),
        "uma/characters": filterUnreleasedContent(
            hideUmaJPContent,
            await getDataSet<UmaCharacter>("uma/characters"),
            "uma",
            pathname,
        ),
        "uma/supports": filterUnreleasedContent(
            hideUmaJPContent,
            await getDataSet<UmaSupport>("uma/supports"),
            "uma",
            pathname,
        ),
        "endfield/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<EndfieldCharacter>("endfield/operators"),
            "endfield",
            pathname,
        ),
        "endfield/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<EndfieldWeapon>("endfield/weapons"),
            "endfield",
            pathname,
        ),
        "nte/characters": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<NTECharacter>("nte/espers"),
            "nte",
            pathname,
        ),
        "nte/weapons": filterUnreleasedContent(
            hideUnreleasedContent,
            await getDataSet<NTEWeapon>("nte/arcs"),
            "nte",
            pathname,
        ),
    })
        .map(([category, data]) =>
            data.map((item) => ({
                id: item.id,
                name: item.name,
                displayName: item.displayName || item.name,
                rarity: item.rarity,
                outfit: "outfit" in item ? item.outfit : undefined,
                specialty: "specialty" in item ? item.specialty : undefined,
                aptitude: "aptitude" in item ? "" : undefined, // "Fake" key to format Uma title
                category: category,
                release: item.release,
                url: item.url
                    ? `/${categoryURLs[category]}/${formatHref(item.url)}`
                    : "",
            })),
        )
        .flat();
    if (game) {
        data = data.filter((item) => item.category.startsWith(game));
    }
    return data;
}
