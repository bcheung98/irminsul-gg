import {
    memo,
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
} from "react";

// Component imports
import SearchDialog, { SearchNoResults } from "@/components/SearchDialog";
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { useProgressiveResults } from "@/hooks";
import { searchResultStyle, useTEHelperData } from "../TEHelper/TEHelper.utils";
import { transformItems } from "@/helpers/transformItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import type { UmaCharacter } from "@/types/uma";
import type { ContentDialogProps } from "@/components/ContentDialog";

interface RatingCalculatorSelectorPopupProps extends ContentDialogProps {
    handleClose: () => void;
    addCharacter: (char: number | null) => void;
}

export default function RatingCalculatorSelectorPopup({
    open,
    setOpen,
    handleClose,
    addCharacter,
}: RatingCalculatorSelectorPopupProps) {
    const { characters } = useTEHelperData();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    }, []);

    const deferredSearchValue = useDeferredValue(searchValue);

    const hits = useMemo<UmaCharacter[]>(() => {
        const data = filterUnreleasedContent(
            hideUnreleasedContent,
            characters,
            "uma",
        );

        return transformItems("uma", data, {}, deferredSearchValue, {
            sortBy: "id",
            sortDirection: "asc",
        });
    }, [characters, hideUnreleasedContent, deferredSearchValue]);

    const { visibleResultCount, resetVisibleResults, handleContentScroll } =
        useProgressiveResults({
            resultCount: hits.length,
        });

    const visibleHits = useMemo(
        () => hits.slice(0, visibleResultCount),
        [hits, visibleResultCount],
    );

    useEffect(() => {
        resetVisibleResults();
    }, [deferredSearchValue, resetVisibleResults]);

    useEffect(() => {
        if (!open) return;

        setSearchValue("");
    }, [open]);

    const handleSelect = useCallback(
        (char: number) => {
            addCharacter(char);
            handleClose();
        },
        [addCharacter, handleClose],
    );

    const SearchResults =
        hits.length > 0 ? (
            <Stack spacing={1}>
                {visibleHits.map((item) => (
                    <SearchResult
                        key={item.id}
                        item={item}
                        onSelect={handleSelect}
                    />
                ))}
            </Stack>
        ) : (
            <SearchNoResults searchValue={deferredSearchValue} />
        );

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder={`Select Character`}
            onContentScroll={handleContentScroll}
        >
            <Stack spacing={1}>{SearchResults}</Stack>
        </SearchDialog>
    );
}

interface SearchResultProps {
    item: UmaCharacter;
    onSelect: (id: number) => void;
}

export const SearchResult = memo(function SearchResult({
    item,
    onSelect,
}: SearchResultProps) {
    const title = `${item.name} (${item.outfit || "Original"})`;

    return (
        <ButtonBase
            key={item.id}
            onClick={() => onSelect(item.id)}
            sx={{
                display: "inline",
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <FlexBox sx={searchResultStyle()}>
                <TextLabel
                    icon={`uma/characters/${item.id}`}
                    iconProps={{ size: 48 }}
                    title={title}
                    spacing={2}
                />
            </FlexBox>
        </ButtonBase>
    );
});
