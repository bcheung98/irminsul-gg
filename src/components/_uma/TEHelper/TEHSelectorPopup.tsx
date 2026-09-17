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
import FlexBox from "@/components/FlexBox";
import Dropdown from "@/components/Dropdown";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Helper imports
import { useStore, useServerStore, useTEHelperStore } from "@/stores";
import { toTitleCase } from "@/utils";
import {
    searchResultStyle,
    TEHInvalidTag,
    useTEHelperData,
} from "./TEHelper.utils";
import { useFilterGroups } from "@/components/Filters";
import { transformItems } from "@/helpers/transformItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { rarityMap } from "@/data/uma/common";

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

    const { decks, currentDeck, addCharacter, addSupport } = useTEHelperStore();
    const deck = decks[currentDeck];

    const supportCharIDs = [...deck.supports]
        .slice(0, 6)
        .map((support) => supports.find((supp) => supp.id === support))
        .map((support) => support?.charID);

    const [hitsLoading, startHitsTransition] = useTransition();

    let data: (UmaCharacter | UmaSupport)[] = [];
    if (category === "character") {
        data = filterUnreleasedContent(
            hideUnreleasedContent,
            characters,
            "uma",
        );
    }
    if (category === "support") {
        data = filterUnreleasedContent(hideUnreleasedContent, supports, "uma");
    }

    const [filters, setFilters] = useState<TEHSelectorFilters>(initialFilters);

    const { specialty, rarity } = useFilterGroups("uma", {
        key: "uma/supports",
    });
    const groups = [];
    if (category === "support") groups.push(specialty, rarity);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<
        (UmaCharacter | UmaSupport)[]
    >([]);
    useEffect(() => {
        startHitsTransition(() => {
            setSearchResults(() =>
                transformItems(
                    "uma",
                    data,
                    category === "support" ? filters : {},
                    searchValue,
                    {
                        sortBy: category === "character" ? "id" : "rarity",
                        sortDirection: "asc",
                    },
                ),
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

    const handleSelect = (item: UmaCharacter | UmaSupport | null) => {
        if (category === "character") {
            if (item && "aptitude" in item) {
                addCharacter(item.id);
                // Removes any conflicting support cards when adding a character
                const charIndex = supportCharIDs.findIndex(
                    (id) => id === item.charID,
                );
                addSupport(charIndex, null);
            } else {
                addCharacter(null);
            }
        }
        if (category === "support") {
            if (item && "specialty" in item) {
                addSupport(index, item.id);
            } else {
                if (index === 6) {
                    addSupport(6, -1);
                } else {
                    addSupport(index, null);
                }
            }
        }
        handleClose();
    };

    function isInvalidOption(item: UmaCharacter | UmaSupport) {
        let message = "";
        let invalid = false;
        let color = theme.palette.error.main;
        if ("aptitude" in item) {
            if (item.id === deck.character) {
                message = "Selected";
            }
        }
        if ("specialty" in item) {
            if (
                item.charID === Number(deck.character?.toString().slice(0, 4))
            ) {
                message = "Trainee";
            } else if (deck.supports.slice(0, 6).includes(item.id)) {
                message = "Selected";
            } else if (supportCharIDs.slice(0, -1).includes(item.charID)) {
                message = "Duplicate support";
                color = theme.palette.error.light;
            }
        }
        if (message !== "") {
            invalid = true;
        }
        return { invalid, message, color };
    }

    const Loader = (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );

    function DeleteOption() {
        const Option = (
            <ButtonBase
                onClick={() => handleSelect(null)}
                sx={{
                    display: "inline",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
                <FlexBox sx={searchResultStyle()} spacing={2}>
                    <HighlightOffIcon
                        sx={{
                            width: "48px",
                            height: "48px",
                            p: "8px",
                            color: theme.text.primary,
                        }}
                    />
                    <Text weight="highlight">{`Remove ${toTitleCase(
                        `${category}`,
                    )}`}</Text>
                </FlexBox>
            </ButtonBase>
        );
        if (category === "character" && deck.character !== null) return Option;
        if (
            category === "support" &&
            deck.supports[index] !== null &&
            deck.supports[index] !== -1
        )
            return Option;

        return <></>;
    }

    function SearchResultCard({
        item,
        invalid,
        message,
        color,
    }: {
        item: UmaCharacter | UmaSupport;
        invalid?: boolean;
        message?: string;
        color?: string;
    }) {
        let title = "";
        if ("aptitude" in item) {
            title = `${item.name} (${item.outfit || "Original"})`;
        } else {
            title = `${item.name} (${rarityMap[item.rarity]} ${
                item.specialty
            })`;
        }

        return (
            <>
                <FlexBox sx={searchResultStyle(invalid)}>
                    <TextLabel
                        icon={`uma/${category}s/${item.id}${
                            category === "support" ? "_icon" : ""
                        }`}
                        iconProps={{ size: 48 }}
                        title={title}
                        spacing={2}
                    />
                </FlexBox>
                <TEHInvalidTag
                    invalid={invalid}
                    message={message}
                    color={color}
                />
            </>
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
            </Text>
        ) : null;

    const SearchResults =
        hits.length > 0 || searchValue === "" ? (
            <Stack spacing={1}>
                {!hitsLoading
                    ? hits.map((item) => {
                          const { invalid, message, color } =
                              isInvalidOption(item);
                          return (
                              <ButtonBase
                                  key={item.id}
                                  onClick={
                                      !invalid
                                          ? () => handleSelect(item)
                                          : undefined
                                  }
                                  disableRipple={invalid}
                                  sx={{
                                      display: "inline",
                                      "&:hover": {
                                          cursor: invalid
                                              ? "not-allowed"
                                              : "pointer",
                                      },
                                  }}
                              >
                                  <SearchResultCard
                                      item={item}
                                      invalid={invalid}
                                      message={message}
                                      color={color}
                                  />
                              </ButtonBase>
                          );
                      })
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
            placeholder={`Add ${toTitleCase(`${category}`)}`}
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
                    <DeleteOption />
                    {SearchResults}
                </Stack>
            </Stack>
        </SearchDialog>
    );
}
