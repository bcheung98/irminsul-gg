import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import FilterButtonsLocal from "@/components/Filters/FilterButtonsLocal";
import Dropdown from "@/components/Dropdown";
import { Loader, SearchResults } from "./PlannerSelectorPopup.components";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, usePlannerStore } from "@/stores";
import { usePlannerData } from "@/components/Planner/Planner.utils";
import { useFilterGroups } from "@/components/Filters";
import { transformItems } from "@/helpers/transformItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import type { ContentDialogProps } from "@/components/ContentDialog";
import type { GameNoUma } from "@/types";
import type { Filters } from "@/types/filters";
import type { PlannerItemData, PlannerType } from "@/types/planner";

interface PlannerSelectorPopupProps extends ContentDialogProps {
    open: boolean;
    type: PlannerType;
    categoryLabel: string;
    handleSelect: (option: PlannerItemData | null) => void;
}

interface PlannerSelectorFilters extends Filters {
    element: string[];
    weaponType: string[];
    rarity: number[];
}

const initialFilters: PlannerSelectorFilters = {
    element: [],
    weaponType: [],
    rarity: [],
};

export default function PlannerSelectorPopup({
    open,
    setOpen,
    type,
    categoryLabel,
    handleSelect,
}: PlannerSelectorPopupProps) {
    const game = useGameTag() as GameNoUma;

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const store = usePlannerStore();

    const { characters, weapons } = usePlannerData();

    const [dataLoading, startDataTransition] = useTransition();
    const [hitsLoading, startHitsTransition] = useTransition();

    const [data, setData] = useState<PlannerItemData[]>([]);
    useEffect(() => {
        startDataTransition(() => {
            const items = type === "characters" ? characters : weapons;
            startDataTransition(() => {
                setData(
                    filterUnreleasedContent(hideUnreleasedContent, items, game),
                );
            });
        });
    }, [open, hideUnreleasedContent]);

    const [filters, setFilters] =
        useState<PlannerSelectorFilters>(initialFilters);

    const { element, weaponType, rarity, specialty } = useFilterGroups(game, {
        key: `${game}/${type}`,
    });
    const groups = [weaponType, rarity];
    if (type === "characters") {
        if (game === "endfield") {
            groups.unshift(specialty);
        }
        groups.unshift(element);
    }

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<PlannerItemData[]>([]);
    useEffect(() => {
        startHitsTransition(() => {
            const selectedItems = store[`${game}/items`];
            const items = data.filter(
                (item) => !selectedItems.map((i) => i.id).includes(item.id),
            );
            setSearchResults(() =>
                transformItems(game, items, filters, searchValue, {
                    sortBy: "version",
                    sortDirection: "asc",
                }),
            );
        });
    }, [open, filters, searchValue]);
    const hits = useMemo(
        () => [...searchResults],
        [data, filters, searchResults],
    );

    useEffect(() => {
        setSearchValue("");
        setFilters(initialFilters);
    }, [open]);

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder={`Add ${categoryLabel}`}
        >
            <Stack spacing={2}>
                <Dropdown title="Filters" textVariant="body1">
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
                {!dataLoading ? (
                    <SearchResults
                        hits={hits}
                        searchValue={searchValue}
                        categoryLabel={categoryLabel}
                        type={type}
                        isPending={hitsLoading}
                        handleSelect={handleSelect}
                        sampleItem={data[0]}
                        groups={groups}
                    />
                ) : (
                    <Loader />
                )}
            </Stack>
        </SearchDialog>
    );
}
