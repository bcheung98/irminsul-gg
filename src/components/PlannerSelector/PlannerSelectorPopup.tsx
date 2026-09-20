import {
    useCallback,
    useDeferredValue,
    useEffect,
    useMemo,
    useState,
} from "react";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import FilterButtonsLocal from "@/components/Filters/FilterButtonsLocal";
import Dropdown from "@/components/Dropdown";
import { SearchResults } from "./PlannerSelectorPopup.components";

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

const RESULTS_PER_PAGE = 20;

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

    const { characters, weapons } = usePlannerData();

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const selectedItems = usePlannerStore((state) => state[`${game}/items`]);

    const data = useMemo(() => {
        const items = type === "characters" ? characters : weapons;

        return filterUnreleasedContent(hideUnreleasedContent, items, game);
    }, [type, characters, weapons, hideUnreleasedContent, game]);

    const availableItems = useMemo(() => {
        const selectedIds = new Set(selectedItems.map((item) => item.id));

        return data.filter((item) => !selectedIds.has(item.id));
    }, [data, selectedItems]);

    const [filters, setFilters] =
        useState<PlannerSelectorFilters>(initialFilters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    }, []);

    const deferredSearchValue = useDeferredValue(searchValue);
    const deferredFilters = useDeferredValue(filters);

    const hits = useMemo(
        () =>
            transformItems(
                game,
                availableItems,
                deferredFilters,
                deferredSearchValue,
                {
                    sortBy: "version",
                    sortDirection: "asc",
                },
            ),
        [game, availableItems, deferredFilters, deferredSearchValue],
    );

    const hitsLoading =
        filters !== deferredFilters || searchValue !== deferredSearchValue;

    const { element, weaponType, rarity, specialty } = useFilterGroups(game, {
        key: `${game}/${type}`,
    });

    const groups = useMemo(() => {
        if (type !== "characters") {
            return [weaponType, rarity];
        }

        return game === "endfield"
            ? [element, specialty, weaponType, rarity]
            : [element, weaponType, rarity];
    }, [type, game, element, specialty, weaponType, rarity]);

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
            </Stack>
        </SearchDialog>
    );
}
