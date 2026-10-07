import {
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import FilterButtonsLocal from "@/components/Filters/FilterButtonsLocal";
import Dropdown from "@/components/Dropdown";
import Text from "@/components/Text";
import { DeleteOption, SearchResult } from "./TEHSelectorPopup.components";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useStore, useServerStore, useTEHelperStore } from "@/stores";
import { toTitleCase } from "@/utils";
import { useProgressiveResults } from "@/hooks";
import { useTEHelperData } from "./TEHelper.utils";
import { useFilterGroups } from "@/components/Filters";
import { transformItems } from "@/helpers/transformItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import type { ContentDialogProps } from "@/components/ContentDialog";
import type {
    UmaCharacter,
    UmaRarity,
    UmaSpecialty,
    UmaSupport,
} from "@/types/uma";
import type { TEHItemCategory } from "@/types/uma/te-helper";
import type { Filters } from "@/types/filters";

interface TEHSelectorPopupProps extends ContentDialogProps {
    open: boolean;
    handleClose: () => void;
    category: TEHItemCategory;
    index: number;
}

interface TEHSelectorFilters extends Filters {
    specialty: UmaSpecialty[];
    rarity: UmaRarity[];
}

const initialFilters: TEHSelectorFilters = {
    specialty: [],
    rarity: [5, 4],
};

export default function TEHSelectorPopup({
    open,
    setOpen,
    handleClose,
    category,
    index,
}: TEHSelectorPopupProps) {
    const theme = useTheme();

    const { characters, supports } = useTEHelperData();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const { deck, addCharacter, addSupport } = useTEHelperStore(
        useShallow((state) => ({
            deck: state.decks[state.currentDeck],
            addCharacter: state.addCharacter,
            addSupport: state.addSupport,
        })),
    );

    const traineeCharID =
        deck.character !== null
            ? Number(deck.character.toString().slice(0, 4))
            : null;

    const selectedSupportIDs = useMemo(
        () => deck.supports.slice(0, 6),
        [deck.supports],
    );

    const supportCharIDs = useMemo(
        () =>
            selectedSupportIDs
                .map((support) => supports.find((supp) => supp.id === support))
                .map((support) => support?.charID),
        [selectedSupportIDs, supports],
    );

    const [filters, setFilters] = useState<TEHSelectorFilters>(initialFilters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    }, []);

    const deferredSearchValue = useDeferredValue(searchValue);
    const deferredFilters = useDeferredValue(filters);

    const hits = useMemo<(UmaCharacter | UmaSupport)[]>(() => {
        if (category === "character") {
            const data = filterUnreleasedContent(
                hideUnreleasedContent,
                characters,
                "uma",
            );

            return transformItems("uma", data, {}, deferredSearchValue, {
                sortBy: "id",
                sortDirection: "asc",
            });
        }

        const data = filterUnreleasedContent(
            hideUnreleasedContent,
            supports,
            "uma",
        );

        return transformItems(
            "uma",
            data,
            deferredFilters,
            deferredSearchValue,
            {
                sortBy: "rarity",
                sortDirection: "asc",
            },
        );
    }, [
        category,
        characters,
        supports,
        hideUnreleasedContent,
        deferredFilters,
        deferredSearchValue,
    ]);

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
    }, [category, deferredSearchValue, deferredFilters, resetVisibleResults]);

    const { specialty, rarity } = useFilterGroups("uma", {
        key: "uma/supports",
    });

    const groups = [];
    if (category === "support") groups.push(specialty, rarity);

    useEffect(() => {
        if (!open) return;

        setSearchValue("");
        setFilters(initialFilters);
    }, [open]);

    const handleSelect = useCallback(
        (item: UmaCharacter | UmaSupport | null) => {
            if (category === "character") {
                if (item && "aptitude" in item) {
                    addCharacter(item.id);

                    const conflictingSupportIndex = supportCharIDs.findIndex(
                        (id) => id === item.charID,
                    );

                    if (conflictingSupportIndex >= 0) {
                        addSupport(conflictingSupportIndex, null);
                    }
                } else {
                    addCharacter(null);
                }
            }

            if (category === "support") {
                if (item && "specialty" in item) {
                    addSupport(index, item.id);
                } else if (index === 6) {
                    addSupport(6, -1);
                } else {
                    addSupport(index, null);
                }
            }

            handleClose();
        },
        [
            category,
            index,
            supportCharIDs,
            addCharacter,
            addSupport,
            handleClose,
        ],
    );

    function isInvalidOption(item: UmaCharacter | UmaSupport) {
        let message = "";
        let color = theme.palette.error.main;

        if ("aptitude" in item) {
            if (item.id === deck.character) {
                message = "Selected";
            }
        } else {
            if (item.charID === traineeCharID) {
                message = "Trainee";
            } else if (selectedSupportIDs.includes(item.id)) {
                message = "Selected";
            } else if (supportCharIDs.includes(item.charID)) {
                message = "Duplicate support";
                color = theme.palette.error.light;
            }
        }

        return {
            invalid: message !== "",
            message,
            color,
        };
    }

    const SearchResults =
        hits.length > 0 ? (
            <Stack spacing={1}>
                {visibleHits.map((item) => {
                    const { invalid, message, color } = isInvalidOption(item);

                    return (
                        <SearchResult
                            key={item.id}
                            item={item}
                            invalid={invalid}
                            message={message}
                            color={color}
                            onSelect={handleSelect}
                        />
                    );
                })}
            </Stack>
        ) : deferredSearchValue !== "" ? (
            <Text sx={{ textAlign: "center", pt: 2 }}>
                {`No results for "`}
                <span
                    style={{
                        fontWeight: theme.font.weight.highlight,
                    }}
                >
                    {deferredSearchValue}
                </span>
                {`"`}
            </Text>
        ) : null;

    const showDeleteOption =
        (category === "character" && deck.character !== null) ||
        (category === "support" &&
            deck.supports[index] !== null &&
            deck.supports[index] !== -1);

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder={`Add ${toTitleCase(`${category}`)}`}
            onContentScroll={handleContentScroll}
        >
            <Stack spacing={2}>
                {category === "support" && (
                    <Dropdown title="Filters" textVariant="body1" defaultOpen>
                        <Stack>
                            {groups.map((filter) => (
                                <FilterButtonsLocal
                                    key={filter.tag}
                                    filter={filter}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            ))}
                        </Stack>
                    </Dropdown>
                )}
                <Stack spacing={1}>
                    {showDeleteOption && (
                        <DeleteOption
                            category={category}
                            onDelete={() => handleSelect(null)}
                        />
                    )}
                    {SearchResults}
                </Stack>
            </Stack>
        </SearchDialog>
    );
}
