import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import FilterButtonsRoot from "@/components/Filters/FilterButtonsRoot";
import FlexBox from "@/components/FlexBox";
import Dropdown from "@/components/Dropdown";
import Text from "@/components/Text";
import PlannerCardHeader from "../PlannerCardRoot/PlannerCardHeader";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";

// Helper imports
import { toTitleCase } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, usePlannerStore } from "@/stores";
import { usePlannerData } from "../Planner/Planner.utils";
import { filterGroups } from "@/data/filters";
import { filterItems } from "@/helpers/filterItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import { ContentDialogProps } from "../ContentDialog";
import { Filters, Game } from "@/types";
import { FilterState } from "@/stores/useFilterStore";
import { PlannerItemData, PlannerType } from "@/types/planner";

interface PlannerSelectorPopupProps extends ContentDialogProps {
    open: boolean;
    type: PlannerType;
    handleSelect: (option: PlannerItemData) => void;
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
    handleSelect,
}: PlannerSelectorPopupProps) {
    const theme = useTheme();

    const game = useGameTag() as Exclude<Game, "uma">;

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
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
                    filterUnreleasedContent(hideUnreleasedContent, items, game)
                );
            });
        });
    }, [open, hideUnreleasedContent]);

    const [filters, setFilters] =
        useState<PlannerSelectorFilters>(initialFilters);
    const setFilterState = (
        _: keyof FilterState,
        tag: string,
        filters: (string | number)[]
    ) => {
        setFilters((state) => {
            return { ...state, [`${tag}`]: filters };
        });
    };

    const { element, weaponType, rarity } = filterGroups({
        key: `${game}/${type}`,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];
    const groups = [weaponType, rarity];
    if (type === "characters") groups.unshift(element);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<PlannerItemData[]>([]);
    useEffect(() => {
        startHitsTransition(() => {
            const selectedItems = store[`${game}/items`];
            const items = data.filter(
                (item) => !selectedItems.map((i) => i.id).includes(item.id)
            );
            setSearchResults(() =>
                filterItems(game, items, filters, searchValue, {
                    sortBy: "version",
                    sortDirection: "asc",
                })
            );
        });
    }, [open, filters, searchValue]);
    const hits = useMemo(
        () => [...searchResults],
        [data, filters, searchResults]
    );

    useEffect(() => {
        setSearchValue("");
        setFilters(initialFilters);
    }, [open]);

    const Loader = (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );

    function SearchResultCard({ item }: { item: PlannerItemData }) {
        return (
            <Card
                sx={{
                    p: 1,
                    backgroundColor: theme.background(0),
                    "&:hover": {
                        backgroundColor: theme.background(0, "light"),
                        cursor: "pointer",
                    },
                }}
            >
                <PlannerCardHeader item={item} type={type} />
            </Card>
        );
    }

    const NoHits =
        searchValue !== "" && !hitsLoading ? (
            <Text sx={{ textAlign: "center", pt: 2 }}>
                {`No results for "`}
                <span style={{ fontWeight: theme.font.weight.highlight }}>
                    {searchValue}
                </span>
                {`"`}
                <br />
                <br />
                {`The item you are looking for may have already been selected.`}
            </Text>
        ) : null;

    const SearchResults =
        hits.length > 0 || searchValue === "" ? (
            <Stack spacing={1}>
                {!hitsLoading
                    ? hits.map((item) => (
                          <ButtonBase
                              key={item.id}
                              onClick={() => handleSelect(item)}
                              sx={{ display: "inline" }}
                          >
                              <SearchResultCard item={item} />
                          </ButtonBase>
                      ))
                    : Loader}
            </Stack>
        ) : (
            NoHits
        );

    return (
        <SearchDialog
            open={open}
            setOpen={setOpen}
            value={searchValue}
            handleInputChange={handleInputChange}
            placeholder={`Add ${toTitleCase(type.slice(0, -1))}`}
        >
            <Stack spacing={2}>
                <Dropdown title="Filters" textVariant="body1">
                    <Stack>
                        {groups.map((filter) => (
                            <FilterButtonsRoot
                                key={filter.name}
                                filter={filter}
                                buttons={filter.buttons}
                            />
                        ))}
                    </Stack>
                </Dropdown>
                {!dataLoading ? SearchResults : Loader}
            </Stack>
        </SearchDialog>
    );
}
