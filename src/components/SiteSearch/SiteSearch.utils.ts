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
import { UmaSkill } from "@/types/uma/skill";

export async function getItems({
    hideUnreleasedContent = true,
    game,
    gameFilter = false,
    hideUmaJPContent = true,
    pathname,
}: {
    hideUnreleasedContent?: boolean;
    game?: Game;
    gameFilter?: boolean;
    hideUmaJPContent?: boolean;
    pathname?: string;
} = {}): Promise<SearchResult[]> {
    const datasets = {
        // Genshin
        "genshin/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<GenshinCharacter>("genshin/characters"),
                    "genshin",
                    pathname,
                ),
        },
        "genshin/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<GenshinWeapon>("genshin/weapons"),
                    "genshin",
                    pathname,
                ),
        },
        "genshin/equipment": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<GenshinArtifact>("genshin/artifacts"),
                    "genshin",
                    pathname,
                ),
        },
        // HSR
        "hsr/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<HSRCharacter>("hsr/characters"),
                    "hsr",
                    pathname,
                ),
        },
        "hsr/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<HSRWeapon>("hsr/lightcones"),
                    "hsr",
                    pathname,
                ),
        },
        "hsr/equipment": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<HSRRelic>("hsr/relics"),
                    "hsr",
                    pathname,
                ),
        },
        // WuWa
        "wuwa/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<WuWaCharacter>("wuwa/resonators"),
                    "wuwa",
                    pathname,
                ),
        },
        "wuwa/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<WuWaWeapon>("wuwa/weapons"),
                    "wuwa",
                    pathname,
                ),
        },
        "wuwa/equipment": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<WuWaEcho>("wuwa/echoes"),
                    "wuwa",
                    pathname,
                ),
        },
        // ZZZ
        "zzz/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<ZZZCharacter>("zzz/agents"),
                    "zzz",
                    pathname,
                ),
        },
        "zzz/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<ZZZWeapon>("zzz/w-engines"),
                    "zzz",
                    pathname,
                ),
        },
        "zzz/equipment": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<ZZZDriveDisc>("zzz/drive-discs"),
                    "zzz",
                    pathname,
                ),
        },
        "zzz/bangboos": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<ZZZBangboo>("zzz/bangboos"),
                    "zzz",
                    pathname,
                ),
        },
        // Uma
        "uma/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUmaJPContent,
                    await getDataSet<UmaCharacter>("uma/characters"),
                    "uma",
                    pathname,
                ),
        },
        "uma/supports": {
            load: async () =>
                filterUnreleasedContent(
                    hideUmaJPContent,
                    await getDataSet<UmaSupport>("uma/supports"),
                    "uma",
                    pathname,
                ),
        },
        "uma/skills": {
            load: async () =>
                filterUmaSkills(
                    hideUmaJPContent,
                    await getDataSet<UmaSkill>("uma/skills"),
                    pathname,
                ),
        },
        // Endfield
        "endfield/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<EndfieldCharacter>("endfield/operators"),
                    "endfield",
                    pathname,
                ),
        },
        "endfield/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<EndfieldWeapon>("endfield/weapons"),
                    "endfield",
                    pathname,
                ),
        },
        // NTE
        "nte/characters": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<NTECharacter>("nte/espers"),
                    "nte",
                    pathname,
                ),
        },
        "nte/weapons": {
            load: async () =>
                filterUnreleasedContent(
                    hideUnreleasedContent,
                    await getDataSet<NTEWeapon>("nte/arcs"),
                    "nte",
                    pathname,
                ),
        },
    } as const;

    // When game filtering is enabled, only load datasets belonging to the selected game
    // Otherwise, load everything.
    const datasetsToLoad = Object.entries(datasets).filter(([category]) => {
        const datasetGame = category.split("/")[0];
        return !gameFilter || !game || datasetGame === game;
    });

    const loadedDatasets = await Promise.all(
        datasetsToLoad.map(async ([category, dataset]) => ({
            category,
            data: await dataset.load(),
        })),
    );

    const data = loadedDatasets.flatMap(({ category, data }) =>
        data.map((item) => ({
            id: item.id,
            name:
                typeof item.name === "string"
                    ? item.name
                    : item.name.global || item.name.jp || item.name.jpNative,
            displayName:
                "displayName" in item
                    ? item.displayName || item.name
                    : item.name.global || item.name.jp || item.name.jpNative,
            rarity: item.rarity,
            outfit: "outfit" in item ? item.outfit : undefined,
            specialty: "specialty" in item ? item.specialty : undefined,
            aptitude: "aptitude" in item ? "" : undefined, // "Fake" key to format Uma title
            category,
            release:
                "release" in item
                    ? item.release
                    : {
                          version: "",
                      },
            url:
                "url" in item
                    ? item.url
                        ? `/${categoryURLs[category]}/${formatHref(item.url)}`
                        : ""
                    : `/${categoryURLs[category]}/${item.id.toString()}`,
            icon: "icon" in item ? item.icon : undefined,
        })),
    );
    return data;
}

function filterUmaSkills(
    hideUnreleasedContent = false,
    items: UmaSkill[],
    pathname?: string,
) {
    if (pathname?.startsWith("uma")) {
        if (hideUnreleasedContent) {
            items = items.filter((item) => item.global);
        }
    }
    return items;
}
