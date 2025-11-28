import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";
import { matchSorter } from "match-sorter";

// Component imports
import SiteSearchResult from "./SiteSearchResult";
import SearchDialog from "@/components/SearchDialog";
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

// Helper imports
import { useTheme } from "@mui/material/styles";
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useSiteSearchStore } from "@/stores";
import { getItems } from "./SiteSearch.utils";

// Type imports
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
    /*
        DO NOT REMOVE!!!
        This prevents "Internal React error: Expected static flag was missing."
        when refreshing the Ascension Planner with items in it.
        I presume it has something to do with calling hooks 
        and updating state in Zustand.
    */
    if (!open) return;

    const theme = useTheme();

    const game = useGameTag();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const pinnedSearches =
        useStore(useSiteSearchStore, (state) => state.pinned) || [];
    const recentSearches =
        useStore(useSiteSearchStore, (state) => state.recent) || [];

    const { removeRecentSearch } = useSiteSearchStore();

    const [dataLoading, startDataTransition] = useTransition();
    const [hitsLoading, startHitsTransition] = useTransition();

    const [data, setData] = useState<SearchResult[]>([]);
    useEffect(() => {
        startDataTransition(async () => {
            const items = await getItems(hideUnreleasedContent, game);
            startDataTransition(() => {
                setData(items);
            });
        });
    }, [hideUnreleasedContent]);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    useEffect(() => {
        startHitsTransition(() => {
            setSearchResults(() => filterSearchResults(data, searchValue));
        });
    }, [searchValue]);
    const hits = useMemo(() => [...searchResults], [data, searchResults]);

    useEffect(() => {
        setSearchValue("");
    }, [open]);

    const Loader = (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );

    const PinnedSearches =
        pinnedSearches.length > 0 ? (
            <Stack spacing={2}>
                <FlexBox spacing={1}>
                    <PushPinIcon
                        fontSize="small"
                        sx={{
                            color: theme.text.primary,
                            transform: "rotate(45deg)",
                        }}
                    />
                    <Text>Pinned</Text>
                </FlexBox>
                <Stack spacing={1}>
                    {pinnedSearches.map((item) => (
                        <SiteSearchResult
                            key={item.url}
                            item={item}
                            handleSelect={handleSelect}
                            buttons={{ removePin: true }}
                        />
                    ))}
                </Stack>
            </Stack>
        ) : null;

    const RecentSearches =
        recentSearches.length > 0 ? (
            <Stack spacing={2}>
                <FlexBox sx={{ justifyContent: "space-between" }}>
                    <FlexBox spacing={1}>
                        <HistoryIcon
                            fontSize="small"
                            sx={{ color: theme.text.primary }}
                        />
                        <Text>Recent</Text>
                    </FlexBox>
                    <Button
                        variant="contained"
                        onClick={() => removeRecentSearch()}
                        endIcon={<DeleteIcon fontSize="small" />}
                    >
                        <Text variant="subtitle2">Clear All</Text>
                    </Button>
                </FlexBox>
                <Stack spacing={1}>
                    {recentSearches.map((item) => (
                        <SiteSearchResult
                            key={item.url}
                            item={item}
                            handleSelect={handleSelect}
                            buttons={{ addPin: true, removeRecent: true }}
                        />
                    ))}
                </Stack>
            </Stack>
        ) : null;

    const SearchHistory = !hitsLoading ? (
        [...pinnedSearches, ...recentSearches].length > 0 ? (
            <Stack spacing={2}>
                {PinnedSearches}
                {RecentSearches}
            </Stack>
        ) : (
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
        )
    ) : (
        Loader
    );

    const NoHits =
        searchValue !== "" && !hitsLoading ? (
            <Text sx={{ textAlign: "center", pt: 2 }}>
                {`No results for "`}
                <span style={{ fontWeight: theme.font.weight.highlight }}>
                    {searchValue}
                </span>
                {`"`}
            </Text>
        ) : null;

    const SearchResults =
        hits.length > 0 ? (
            <Stack spacing={1}>
                {hits.map((item) => (
                    <SiteSearchResult
                        key={item.url}
                        item={item}
                        handleSelect={handleSelect}
                    />
                ))}
            </Stack>
        ) : (
            NoHits
        );

    const SearchContent = searchValue !== "" ? SearchResults : SearchHistory;

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder="Search Irminsul..."
        >
            {!dataLoading ? SearchContent : Loader}
        </SearchDialog>
    );
}

function filterSearchResults(items: SearchResult[], searchValue: string) {
    if (searchValue !== "") {
        return matchSorter(items, searchValue, {
            keys: ["displayName", "name"],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
    } else {
        return [];
    }
}
