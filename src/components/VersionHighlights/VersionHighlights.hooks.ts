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
import { gearSets } from "@/data/endfield/gearSets";

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

const sortEndfieldGear: SortFn = (a, b) => {
    const ai = gearSets.find((set) => set.id === a.set)?.displayName || "zzzz";
    const bi = gearSets.find((set) => set.id === b.set)?.displayName || "zzzz";
    return (
        b.rarity - a.rarity ||
        ai.localeCompare(bi) ||
        a.type.localeCompare(b.type) ||
        a.id - b.id
    );
};

export function useVersionContent(
    game: Game,
    items: VersionHighlightsProps,
    version: string,
): VersionHighlightsProps {
    const getVersionContent = getItems(version);

    const characters = getVersionContent(items.characters) ?? [];
    const weapons = getVersionContent(items.weapons) ?? [];
    const equipment =
        getVersionContent(
            items.equipment,
            game === "endfield" ? sortEndfieldGear : sortItems,
        ) ?? [];
    const bangboos = getVersionContent(items.bangboos) ?? [];
    const cards = getVersionContent(items.cards, (a, b) => a.id - b.id) ?? [];
    return { characters, weapons, equipment, bangboos, cards };
}
