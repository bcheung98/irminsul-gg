import { matchSorter } from "match-sorter";
import { SearchResult } from "./SiteSearch";

export function filterSearchResults(
    items: SearchResult[],
    searchValue: string,
) {
    if (searchValue === "") return [];

    return matchSorter(items, searchValue, {
        keys: ["displayName", "name"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
}
