// Component imports
import FlexBox from "@/components/FlexBox";
import PlannerCardHeader from "@/components/PlannerCardRoot/PlannerCardHeader";
import PlannerCustomItem from "@/components/PlannerCustomItem";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";

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

export function Loader() {
    return (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );
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

    return hits.length > 0 || searchValue === "" ? (
        <SearchContent
            hits={hits}
            categoryLabel={categoryLabel}
            type={type}
            isPending={isPending}
            handleSelect={handleSelect}
            sampleItem={sampleItem}
            groups={groups}
        />
    ) : (
        <>
            {CUSTOM_ITEMS_ENABLED_GAMES.has(game) && (
                <PlannerCustomItem
                    label={categoryLabel}
                    handleSelect={handleSelect}
                    sampleItem={sampleItem}
                    groups={groups}
                    type={type}
                />
            )}
        </>
    );
}

function SearchContent({
    hits,
    categoryLabel,
    type,
    isPending,
    handleSelect,
    sampleItem,
    groups,
}: Omit<SearchResultsProps, "searchValue">) {
    const game = useGameTag() as GameNoUma;

    return !isPending ? (
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
            {hits.map((item) => (
                <ButtonBase
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    sx={{ display: "inline" }}
                >
                    <SearchResultCard item={item} type={type} />
                </ButtonBase>
            ))}
        </Stack>
    ) : (
        <Loader />
    );
}

function SearchResultCard({
    item,
    type,
}: {
    item: PlannerItemData;
    type: PlannerType;
}) {
    const theme = useTheme();

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
