import { useCallback, useEffect, useRef, useState, useTransition } from "react";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Switch from "@/components/Switch";
import {
    Loader,
    SearchHistory,
    SearchResults,
} from "./SiteSearchPopup.components";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { useGame, useGameTag } from "@/context";
import {
    useStore,
    useSettingsStore,
    useSiteSearchStore,
    useServerStore,
} from "@/stores";
import { getItems } from "./SiteSearch.utils";
import { useSiteSearchPopup } from "./SiteSearchPopup.hooks";

// Type imports
import { Game } from "@/types";
import { SearchResult } from "./SiteSearch";
import { ContentDialogProps } from "@/components/ContentDialog";

interface SiteSearchPopupProps extends ContentDialogProps {
    open: boolean;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}

export default function SiteSearchPopup({
    open,
    setOpen,
    handleSelect,
}: SiteSearchPopupProps) {
    const game = useGame();
    const gameTag = useGameTag();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    // Uma specific
    const server = useServerStore().uma;
    const hideUmaJPContent = gameTag === "uma" && server === "NA";

    const [gameFilter, setGameFilter] = useState(gameTag !== undefined);
    const handleSwitchChange = useCallback(() => {
        setGameFilter((previous) => !previous);
    }, []);

    const pinnedSearches =
        useStore(useSiteSearchStore, (state) => state.pinned) || [];
    const recentSearches =
        useStore(useSiteSearchStore, (state) => state.recent) || [];

    const { removeRecentSearch } = useSiteSearchStore();

    const [dataLoading, startDataTransition] = useTransition();

    const loadedKey = useRef<string | null>(null);

    const [data, setData] = useState<SearchResult[]>([]);
    useEffect(() => {
        if (!open) return;

        let currentGame: Game | undefined = gameTag;
        if (!gameFilter) currentGame = undefined;

        const key = [
            currentGame ?? "",
            hideUnreleasedContent,
            hideUmaJPContent,
        ].join("|");

        if (loadedKey.current === key) return;
        loadedKey.current = key;

        startDataTransition(async () => {
            const items = await getItems({
                hideUnreleasedContent,
                game: currentGame,
                gameFilter,
                hideUmaJPContent,
            });
            setData(items);
        });
    }, [open, gameTag, gameFilter, hideUnreleasedContent, hideUmaJPContent]);

    const {
        searchValue,
        searchResults,
        visibleSearchResults,
        highlightedIndex,
        keyboardNavigation,
        handleInputChange,
        handleKeyDown,
        handleMouseEnter,
        handleContentScroll,
    } = useSiteSearchPopup({
        open,
        data,
        pinnedSearches,
        recentSearches,
        handleSelect,
    });

    const searchContent =
        searchValue !== "" ? (
            <SearchResults
                searchResults={searchResults}
                visibleSearchResults={visibleSearchResults}
                highlightedIndex={highlightedIndex}
                keyboardNavigation={keyboardNavigation}
                searchValue={searchValue}
                handleMouseEnter={handleMouseEnter}
                handleSelect={handleSelect}
            />
        ) : (
            <SearchHistory
                pinnedSearches={pinnedSearches}
                recentSearches={recentSearches}
                highlightedIndex={highlightedIndex}
                keyboardNavigation={keyboardNavigation}
                handleMouseEnter={handleMouseEnter}
                handleSelect={handleSelect}
                removeRecentSearch={removeRecentSearch}
            />
        );

    const gameFilterSwitch =
        gameTag && searchValue !== "" ? (
            <FlexBox spacing={2}>
                <Switch
                    checked={gameFilter}
                    onChange={handleSwitchChange}
                    size="small"
                />
                <Text variant="subtitle1" weight="highlight">
                    {`Limit search results to ${game?.name}`}
                </Text>
            </FlexBox>
        ) : null;

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder="Search Irminsul..."
            backgroundBlur="4px"
            onKeyDown={handleKeyDown}
            onContentScroll={handleContentScroll}
        >
            <Stack spacing={2}>
                {gameFilterSwitch}
                {!dataLoading ? searchContent : <Loader />}
            </Stack>
        </SearchDialog>
    );
}
