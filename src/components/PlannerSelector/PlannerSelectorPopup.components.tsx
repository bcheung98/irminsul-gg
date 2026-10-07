import { memo, useEffect, useState } from "react";

// Component imports
import PlannerCardHeader from "@/components/PlannerCardRoot/PlannerCardHeader";
import PlannerCustomItem from "@/components/PlannerCustomItem";
import { SearchLoader, SearchNoResults } from "@/components/SearchDialog";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerItemData, PlannerType } from "@/types/planner";
import type { FilterGroup } from "@/types/filters";

const CUSTOM_ITEMS_ENABLED_GAMES = new Set<GameNoUma>([
    "genshin",
    "hsr",
    "wuwa",
    "zzz",
    "nte",
]);

interface SearchResultsProps {
    hits: PlannerItemData[];
    searchValue: string;
    categoryLabel: string;
    type: PlannerType;
    isPending: boolean;
    handleSelect: (option: PlannerItemData | null) => void;
    sampleItem: PlannerItemData;
    groups: FilterGroup[];
}

export function SearchResults({
    hits,
    searchValue,
    categoryLabel,
    type,
    isPending,
    handleSelect,
    sampleItem,
    groups,
}: SearchResultsProps) {
    const game = useGameTag() as GameNoUma;

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (!isPending) {
            setShowLoader(false);
            return;
        }
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, 150);
        return () => clearTimeout(timeout);
    }, [isPending]);

    return (
        <Stack spacing={1}>
            {CUSTOM_ITEMS_ENABLED_GAMES.has(game) && (
                <PlannerCustomItem
                    label={categoryLabel}
                    handleSelect={handleSelect}
                    sampleItem={sampleItem}
                    groups={groups}
                    type={type}
                />
            )}
            {!!hits.length && showLoader && <SearchLoader />}
            {hits.length ? (
                <Stack
                    spacing={1}
                    sx={{
                        display: showLoader ? "none" : undefined,
                    }}
                >
                    {hits.map((item) => (
                        <SearchResultCard
                            key={item.id}
                            item={item}
                            type={type}
                            handleSelect={handleSelect}
                        />
                    ))}
                </Stack>
            ) : (
                !showLoader && (
                    <SearchNoResults searchValue={searchValue}>
                        The item you are looking for may have already been
                        selected.
                    </SearchNoResults>
                )
            )}
        </Stack>
    );
}

const SearchResultCard = memo(function ({
    item,
    type,
    handleSelect,
}: {
    item: PlannerItemData;
    type: PlannerType;
    handleSelect: (option: PlannerItemData | null) => void;
}) {
    const theme = useTheme();

    return (
        <ButtonBase
            onClick={() => handleSelect(item)}
            sx={{ display: "inline" }}
        >
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
        </ButtonBase>
    );
});
