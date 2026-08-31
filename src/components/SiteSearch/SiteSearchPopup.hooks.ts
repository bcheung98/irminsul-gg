import { useCallback, useEffect, useMemo, useState } from "react";

// Helper imports
import { filterSearchResults } from "./SiteSearch.search";

// Type imports
import { SearchResult } from "./SiteSearch";

const RESULTS_PER_BATCH = 25;
const LOAD_MORE_THRESHOLD = 350; // px

interface UseSiteSearchPopupProps {
    open: boolean;
    data: SearchResult[];
    pinnedSearches: SearchResult[];
    recentSearches: SearchResult[];
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}

export function useSiteSearchPopup({
    open,
    data,
    pinnedSearches,
    recentSearches,
    handleSelect,
}: UseSiteSearchPopupProps) {
    const [searchValue, setSearchValue] = useState("");

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [keyboardNavigation, setKeyboardNavigation] = useState(false);
    const [visibleResultCount, setVisibleResultCount] =
        useState(RESULTS_PER_BATCH);

    /*
     * Search
     */
    useEffect(() => {
        const results = filterSearchResults(data, searchValue);
        setSearchResults(results);
    }, [data, searchValue]);

    /*
     * Navigation items
     *
     * When there is no search query, keyboard navigation operates
     * on pinned/recent searches. Otherwise it operates on search results.
     */
    const navigationItems = useMemo(
        () =>
            searchValue === ""
                ? [...pinnedSearches, ...recentSearches]
                : searchResults,
        [searchValue, pinnedSearches, recentSearches, searchResults],
    );

    /*
     * Visible search results
     */
    const visibleSearchResults = useMemo(
        () => searchResults.slice(0, visibleResultCount),
        [searchResults, visibleResultCount],
    );

    /*
     * Reset the visible result count whenever the search query changes
     */
    useEffect(() => {
        setVisibleResultCount(RESULTS_PER_BATCH);
    }, [searchValue]);

    /*
     * Input
     */
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setHighlightedIndex(-1);
        setSearchValue(event.target.value);
    }, []);

    /*
     * Keyboard navigation
     */
    const handleHighlightChange = useCallback(
        (direction: "ArrowUp" | "ArrowDown") => {
            if (navigationItems.length === 0) return;

            let nextIndex: number;
            if (direction === "ArrowUp") {
                if (highlightedIndex <= 0) {
                    // When searching, wrap to the last currently visible
                    // result rather than rendering the entire result set
                    nextIndex =
                        searchValue !== ""
                            ? Math.min(
                                  visibleResultCount,
                                  searchResults.length,
                              ) - 1
                            : navigationItems.length - 1;
                } else {
                    nextIndex = highlightedIndex - 1;
                }
            } else {
                if (highlightedIndex >= navigationItems.length - 1) {
                    nextIndex = 0;
                } else {
                    nextIndex = highlightedIndex + 1;
                }
            }
            setKeyboardNavigation(true);
            setHighlightedIndex(nextIndex);
        },
        [
            navigationItems,
            highlightedIndex,
            searchValue,
            visibleResultCount,
            searchResults.length,
        ],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Tab") {
                event.preventDefault();
            }
            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
                handleHighlightChange(event.key);
            }
            if (event.key === "Enter" && highlightedIndex !== -1) {
                event.preventDefault();

                const item = navigationItems[highlightedIndex];

                if (item) {
                    handleSelect(item, true);
                }
            }
        },
        [
            highlightedIndex,
            navigationItems,
            handleHighlightChange,
            handleSelect,
        ],
    );

    /*
     * Mouse navigation
     */
    const handleMouseEnter = useCallback((index: number) => {
        setKeyboardNavigation(false);
        setHighlightedIndex(index);
    }, []);

    /*
     * Render additional results when keyboard navigation moves
     * beyond the currently rendered batch
     */
    useEffect(() => {
        if (highlightedIndex === -1 || searchValue === "") return;

        if (
            highlightedIndex >= visibleResultCount &&
            highlightedIndex < searchResults.length
        ) {
            setVisibleResultCount(
                Math.min(
                    Math.ceil((highlightedIndex + 1) / RESULTS_PER_BATCH) *
                        RESULTS_PER_BATCH,
                    searchResults.length,
                ),
            );
            return;
        }
        document
            .getElementById(navigationItems[highlightedIndex]?.url)
            ?.scrollIntoView({
                behavior: "instant",
                block: "nearest",
            });
    }, [
        highlightedIndex,
        navigationItems,
        searchValue,
        visibleResultCount,
        searchResults.length,
    ]);

    /*
     * Progressive rendering based on scroll position
     */
    const handleContentScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            if (searchValue === "") return;

            const element = event.currentTarget;
            const distanceFromBottom =
                element.scrollHeight - element.scrollTop - element.clientHeight;
            if (distanceFromBottom <= LOAD_MORE_THRESHOLD) {
                setVisibleResultCount((count) => {
                    if (count >= searchResults.length) {
                        return count;
                    }
                    return Math.min(
                        count + RESULTS_PER_BATCH,
                        searchResults.length,
                    );
                });
            }
        },
        [searchValue, searchResults.length],
    );

    /*
     * Reset popup state when it opens.
     */
    useEffect(() => {
        setHighlightedIndex(-1);
        setKeyboardNavigation(false);
        setSearchValue("");
        setVisibleResultCount(RESULTS_PER_BATCH);
    }, [open]);

    return {
        searchValue,
        searchResults,
        visibleSearchResults,
        highlightedIndex,
        keyboardNavigation,
        handleInputChange,
        handleKeyDown,
        handleMouseEnter,
        handleContentScroll,
    };
}
