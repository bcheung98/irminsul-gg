import { useEffect, useMemo, useState, useTransition } from "react";
import { matchSorter } from "match-sorter";

// Component imports
import SiteSearchResult from "./SiteSearchResult";
import ContentDialog, { ContentDialogProps } from "@/components/ContentDialog";
import SearchBar from "@/components/SearchBar";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// Helper imports
import { useGameTag } from "@/context";
import { getItems } from "./SiteSearch.utils";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useStore } from "@/hooks";
import { useSettingsStore } from "@/stores/useSettingsStore";

// Type imports
import { SearchResult } from "./SiteSearch";

interface SiteSearchPopupProps extends ContentDialogProps {
    value: string;
    focus: number;
    handleFocusChange: (index: number) => void;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}

export default function SiteSearchPopup({
    open,
    value,
    focus,
    handleFocusChange,
    handleInputChange,
    handleSelect,
    ...other
}: SiteSearchPopupProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const game = useGameTag();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const [loading, startTransition] = useTransition();
    const [data, setData] = useState<SearchResult[]>([]);

    const searchResults = useMemo(
        () => filterSearchResults(data, value),
        [data, value]
    );

    useEffect(() => {
        startTransition(async () => {
            const items = await getItems(game);
            setData(
                filterUnreleasedContent(hideUnreleasedContent, items, game)
            );
        });
    }, [open, value]);

    return (
        <ContentDialog
            {...other}
            open={open}
            fullWidth
            fullScreen={!matches}
            header={
                <Box sx={{ width: "75%" }}>
                    <SearchBar
                        autoFocus
                        placeholder="Search Irminsul..."
                        value={value}
                        onChange={handleInputChange}
                    />
                </Box>
            }
            sx={{
                backdropFilter: "blur(4px)",
                ".MuiDialog-paper": {
                    maxWidth: "600px",
                    minHeight: { sm: "96px" },
                    maxHeight: { sm: "640px" },
                },
            }}
            headerProps={{ padding: "0 16px 0 0" }}
            contentProps={{ padding: 0 }}
        >
            <Stack spacing={1} sx={{ p: 3 }}>
                {!loading ? (
                    searchResults.map((item, index) => (
                        <SiteSearchResult
                            key={item.url}
                            item={item}
                            selected={index === focus}
                            handleSelect={handleSelect}
                        />
                    ))
                ) : (
                    <Box
                        sx={{ display: "flex", justifyContent: "center", p: 3 }}
                    >
                        <CircularProgress color="info" />
                    </Box>
                )}
            </Stack>
        </ContentDialog>
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
