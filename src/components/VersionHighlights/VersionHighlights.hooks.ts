import useSWR from "swr";

// Helper imports
import { urls } from "@/api";
import versions from "@/data/versions";

// Type imports
import { Game, GameInfo } from "@/types";
import { Banner } from "@/types/banner";
import {
    VersionHighlightsProps,
    VersionItemData,
} from "./VersionHighlights.types";

type SortFn = (a: VersionItemData, b: VersionItemData) => number;

function getItems(version: string) {
    return (items?: VersionItemData[], sortFn?: SortFn) =>
        items?.filter(filterItems(version)).sort(sortFn || sortItems);
}

function filterItems(version: string): (items: VersionItemData) => boolean {
    return (items: VersionItemData) => items.release.version === version;
}

const sortItems: SortFn = (a, b) => {
    return b.rarity - a.rarity || a.displayName.localeCompare(b.displayName);
};

export function useVersionContent(
    items: VersionHighlightsProps,
    version: string,
): VersionHighlightsProps {
    const getVersionContent = getItems(version);

    const characters = getVersionContent(items.characters) ?? [];
    const weapons = getVersionContent(items.weapons) ?? [];
    const equipment = getVersionContent(items.equipment) ?? [];
    const bangboos = getVersionContent(items.bangboos) ?? [];
    const cards = getVersionContent(items.cards, (a, b) => a.id - b.id) ?? [];
    return { characters, weapons, equipment, bangboos, cards };
}

function findVersionReleaseDate(
    banners: Banner[],
    version: string,
): string | undefined {
    return banners.find((banner) => banner.version === `${version}.1`)?.start;
}

export function useVersionReleaseDate(
    game: Game,
    version: string,
): string | undefined {
    const { data } = useSWR<Banner[]>(
        urls[`${game}/banner-characters`],
        (url: string) => fetch(url).then((r) => r.json()),
    );
    return findVersionReleaseDate(data ?? [], version);
}

export function useVersionReleaseDates(
    games: GameInfo[],
): Partial<Record<Game, string | null>> | undefined {
    const gameData = games.map((game) => {
        const { version } = versions[game.tag][0];

        return {
            game: game.tag,
            version,
            url: urls[`${game.tag}/banner-characters`],
        };
    });

    const { data } = useSWR(
        ["version-release-dates", gameData],
        async ([, gameData]) => {
            const results = await Promise.all(
                gameData.map(async ({ game, version, url }) => {
                    const banners: Banner[] = await fetch(url).then((r) =>
                        r.json(),
                    );

                    return {
                        game,
                        start: findVersionReleaseDate(banners, version) ?? null,
                    };
                }),
            );

            return Object.fromEntries(
                results.map(({ game, start }) => [game, start]),
            ) as Partial<Record<Game, string | null>>;
        },
    );

    return data;
}
