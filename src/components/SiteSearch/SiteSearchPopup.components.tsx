// Component imports
import SiteSearchResult from "./SiteSearchResult";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PushPinIcon from "@mui/icons-material/PushPin";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";

// Type imports
import { SearchResult } from "./SiteSearch";

export function Loader() {
    return (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );
}

interface PinnedSearchesProps {
    pinnedSearches: SearchResult[];
    highlightedIndex: number;
    handleMouseEnter: (index: number) => void;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}

export function PinnedSearches({
    pinnedSearches,
    highlightedIndex,
    handleMouseEnter,
    handleSelect,
}: PinnedSearchesProps) {
    return pinnedSearches.length > 0 ? (
        <Stack spacing={2}>
            <FlexBox spacing={1}>
                <PushPinIcon
                    fontSize="small"
                    sx={(theme) => ({
                        color: theme.text.primary,
                        transform: "rotate(45deg)",
                    })}
                />
                <Text weight="highlight">Pinned</Text>
            </FlexBox>
            <Stack spacing={1}>
                {pinnedSearches.map((item, index) => (
                    <SiteSearchResult
                        key={item.url}
                        item={item}
                        index={index}
                        highlighted={highlightedIndex === index}
                        handleMouseEnter={handleMouseEnter}
                        handleSelect={handleSelect}
                        buttons={{ removePin: true }}
                    />
                ))}
            </Stack>
        </Stack>
    ) : null;
}

interface RecentSearchesProps {
    recentSearches: SearchResult[];
    pinnedSearchCount: number;
    highlightedIndex: number;
    handleMouseEnter: (index: number) => void;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
    removeRecentSearch: () => void;
}

export function RecentSearches({
    recentSearches,
    pinnedSearchCount,
    highlightedIndex,
    handleMouseEnter,
    handleSelect,
    removeRecentSearch,
}: RecentSearchesProps) {
    return recentSearches.length > 0 ? (
        <Stack spacing={2}>
            <FlexBox sx={{ justifyContent: "space-between" }}>
                <FlexBox spacing={1}>
                    <HistoryIcon
                        fontSize="small"
                        sx={(theme) => ({ color: theme.text.primary })}
                    />
                    <Text weight="highlight">Recent</Text>
                </FlexBox>
                <Button
                    variant="contained"
                    onClick={() => removeRecentSearch()}
                    endIcon={<DeleteIcon fontSize="small" />}
                >
                    <Text variant="subtitle2" weight="highlight">
                        Clear All
                    </Text>
                </Button>
            </FlexBox>
            <Stack spacing={1}>
                {recentSearches.map((item, index) => (
                    <SiteSearchResult
                        key={item.url}
                        item={item}
                        index={index + pinnedSearchCount}
                        highlighted={
                            highlightedIndex === index + pinnedSearchCount
                        }
                        handleMouseEnter={handleMouseEnter}
                        handleSelect={handleSelect}
                        buttons={{ addPin: true, removeRecent: true }}
                    />
                ))}
            </Stack>
        </Stack>
    ) : null;
}

interface SearchHistoryProps {
    pinnedSearches: SearchResult[];
    recentSearches: SearchResult[];
    highlightedIndex: number;
    keyboardNavigation: boolean;
    handleMouseEnter: (index: number) => void;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
    removeRecentSearch: () => void;
}

export function SearchHistory({
    pinnedSearches,
    recentSearches,
    highlightedIndex,
    keyboardNavigation,
    handleMouseEnter,
    handleSelect,
    removeRecentSearch,
}: SearchHistoryProps) {
    const hasHistory = pinnedSearches.length > 0 || recentSearches.length > 0;

    if (!hasHistory) {
        return (
            <FlexBox sx={{ justifyContent: "center" }}>
                <Stack spacing={2}>
                    <Text
                        variant="h6"
                        weight="highlight"
                        sx={{ textAlign: "center" }}
                    >
                        Looking for something?
                    </Text>
                    <Image
                        src="genshin/emotes/error10"
                        style={{
                            width: "100%",
                            maxWidth: "192px",
                            height: "auto",
                            margin: "16px auto",
                        }}
                    />
                </Stack>
            </FlexBox>
        );
    }

    return (
        <Stack
            spacing={2}
            sx={(theme) => ({
                ...(keyboardNavigation && {
                    "& .MuiMenuItem-root:hover": {
                        backgroundColor: theme.menu.backgroundColor.primary,
                    },
                }),
            })}
        >
            <PinnedSearches
                pinnedSearches={pinnedSearches}
                highlightedIndex={highlightedIndex}
                handleMouseEnter={handleMouseEnter}
                handleSelect={handleSelect}
            />
            <RecentSearches
                recentSearches={recentSearches}
                pinnedSearchCount={pinnedSearches.length}
                highlightedIndex={highlightedIndex}
                handleMouseEnter={handleMouseEnter}
                handleSelect={handleSelect}
                removeRecentSearch={removeRecentSearch}
            />
        </Stack>
    );
}

export function NoHits({ searchValue }: { searchValue: string }) {
    return (
        <Text
            sx={(theme) => ({
                textAlign: "center",
                pt: 2,
                "& span": {
                    fontWeight: theme.font.weight.highlight,
                },
            })}
        >
            {`No results for "`}
            <span>{searchValue}</span>
            {`"`}
        </Text>
    );
}

interface SearchResultsProps {
    searchResults: SearchResult[];
    visibleSearchResults: SearchResult[];
    highlightedIndex: number;
    keyboardNavigation: boolean;
    searchValue: string;
    handleMouseEnter: (index: number) => void;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}

export function SearchResults({
    searchResults,
    visibleSearchResults,
    highlightedIndex,
    keyboardNavigation,
    searchValue,
    handleMouseEnter,
    handleSelect,
}: SearchResultsProps) {
    if (searchResults.length === 0) {
        return <NoHits searchValue={searchValue} />;
    }

    return (
        <Stack
            spacing={1}
            sx={(theme) => ({
                ...(keyboardNavigation && {
                    "& .MuiMenuItem-root:hover": {
                        backgroundColor: theme.menu.backgroundColor.primary,
                    },
                }),
            })}
        >
            {visibleSearchResults.map((item, index) => (
                <SiteSearchResult
                    key={item.url}
                    item={item}
                    index={index}
                    highlighted={highlightedIndex === index}
                    handleMouseEnter={handleMouseEnter}
                    handleSelect={handleSelect}
                />
            ))}
        </Stack>
    );
}
