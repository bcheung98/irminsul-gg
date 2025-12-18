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
import Switch from "@/components/Switch";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PushPinIcon from "@mui/icons-material/PushPin";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useGame, useGameTag } from "@/context";
import {
    useStore,
    useSettingsStore,
    useSiteSearchStore,
    useServerStore,
} from "@/stores";
import { getItems } from "./SiteSearch.utils";

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
    const theme = useTheme();

    const game = useGameTag();
    const gameTitle = useGame();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    // Uma specific
    const server = useServerStore().uma;
    const hideUmaJPContent = game === "uma" && server === "NA";

    const [gameFilter, setGameFilter] = useState(game !== undefined);
    const handleSwitchChange = () => {
        setGameFilter(!gameFilter);
    };

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
            let currentGame: Game | undefined = game;
            if (!gameFilter) currentGame = undefined;
            const items = await getItems(
                hideUnreleasedContent,
                currentGame,
                hideUmaJPContent
            );
            startDataTransition(() => {
                setData(items);
            });
        });
    }, [game, gameFilter, hideUnreleasedContent]);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setFocus(-1);
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    useEffect(() => {
        startHitsTransition(() => {
            setSearchResults(() => filterSearchResults(data, searchValue));
        });
    }, [data, searchValue]);
    const hits = useMemo(() => [...searchResults], [data, searchResults]);

    useEffect(() => {
        setFocus(-1);
        setSearchValue("");
        setGameFilter(game !== undefined);
    }, [open]);

    const [focus, setFocus] = useState(-1);
    const handleFocusChange = useCallback((index: number) => {
        setFocus(index);
    }, []);
    const handleFocusChangeKey = useCallback(
        (direction: "ArrowUp" | "ArrowDown") => {
            const values =
                searchValue === ""
                    ? [...pinnedSearches, ...recentSearches]
                    : searchResults;
            let index;
            if (direction === "ArrowUp") {
                index = focus - 1;
                if (index < 0) {
                    index = values.length - 1;
                }
            } else {
                index = focus + 1;
                if (index > values.length - 1) {
                    index = 0;
                }
            }
            setFocus(index);
            const element = document.getElementById(
                values[index].url
            ) as HTMLMenuElement;
            element?.scrollIntoView({ behavior: "instant", block: "nearest" });
        },
        [focus, searchValue, pinnedSearches, recentSearches, searchResults]
    );

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
                    <Text weight="highlight">Pinned</Text>
                </FlexBox>
                <Stack spacing={1}>
                    {pinnedSearches.map((item, index) => (
                        <SiteSearchResult
                            key={item.url}
                            index={index}
                            focus={focus}
                            item={item}
                            handleSelect={handleSelect}
                            handleFocusChange={handleFocusChange}
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
                            index={index + pinnedSearches.length}
                            focus={focus}
                            item={item}
                            handleSelect={handleSelect}
                            handleFocusChange={handleFocusChange}
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
                {hits.map((item, index) => (
                    <SiteSearchResult
                        key={item.url}
                        index={index}
                        focus={focus}
                        item={item}
                        handleFocusChange={handleFocusChange}
                        handleSelect={handleSelect}
                    />
                ))}
            </Stack>
        ) : (
            NoHits
        );

    const SearchContent = searchValue !== "" ? SearchResults : SearchHistory;

    const GameFilter =
        game && searchValue !== "" ? (
            <FlexBox spacing={2}>
                <Switch
                    checked={gameFilter}
                    onChange={handleSwitchChange}
                    size="small"
                />
                <Text
                    variant="subtitle1"
                    weight="highlight"
                >{`Limit search results to ${gameTitle?.name}`}</Text>
            </FlexBox>
        ) : null;

    function keydownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
        const values =
            searchValue === ""
                ? [...pinnedSearches, ...recentSearches]
                : searchResults;
        if (event.key === "Tab") {
            event.preventDefault();
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            handleFocusChangeKey(event.key);
        }
        if (event.key === "Enter") {
            if (focus !== -1) {
                event.preventDefault();
                handleSelect(values[focus], true);
            }
        }
    }

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder="Search Irminsul..."
            backgroundBlur="4px"
            onKeyDown={(event) => keydownHandler(event)}
        >
            <Stack spacing={2}>
                {GameFilter}
                {!dataLoading ? SearchContent : Loader}
            </Stack>
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
