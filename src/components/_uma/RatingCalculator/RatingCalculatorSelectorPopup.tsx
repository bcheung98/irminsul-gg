import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";

// Component imports
import SearchDialog from "@/components/SearchDialog";
import { ContentDialogProps } from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { searchResultStyle, useTEHelperData } from "../TEHelper/TEHelper.utils";
import { filterItems } from "@/helpers/filterItems";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import { UmaCharacter } from "@/types/uma";

interface Props extends ContentDialogProps {
    open: boolean;
    handleClose: () => void;
    addCharacter: (char: number | null) => void;
}

export default function RatingCalculatorSelectorPopup({
    open,
    setOpen,
    handleClose,
    addCharacter,
}: Props) {
    const theme = useTheme();

    const { characters } = useTEHelperData();

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const [hitsLoading, startHitsTransition] = useTransition();

    let data: UmaCharacter[] = filterUnreleasedContent(
        hideUnreleasedContent,
        characters,
        "uma",
    );

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setSearchValue(() => event.target.value);
    }, []);

    const [searchResults, setSearchResults] = useState<UmaCharacter[]>([]);
    useEffect(() => {
        startHitsTransition(() => {
            setSearchResults(() =>
                filterItems("uma", data, {}, searchValue, {
                    sortBy: "id",
                    sortDirection: "asc",
                }),
            );
        });
    }, [open, searchValue]);
    const hits = useMemo(() => [...searchResults], [data, searchResults]);

    const handleSelect = (char: number | null) => {
        if (char) {
            addCharacter(char);
        } else {
            addCharacter(null);
        }
        handleClose();
    };

    const Loader = (
        <FlexBox sx={{ justifyContent: "center", pt: 3 }}>
            <CircularProgress color="info" />
        </FlexBox>
    );

    function SearchResultCard({ char }: { char: UmaCharacter }) {
        const title = `${char.name} (${char.outfit || "Original"})`;
        return (
            <FlexBox sx={searchResultStyle()}>
                <TextLabel
                    icon={`uma/characters/${char.id}`}
                    iconProps={{ size: 48 }}
                    title={title}
                    spacing={2}
                />
            </FlexBox>
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
                          return (
                              <ButtonBase
                                  key={item.id}
                                  onClick={() => handleSelect(item.id)}
                                  sx={{
                                      display: "inline",
                                      "&:hover": {
                                          cursor: "pointer",
                                      },
                                  }}
                              >
                                  <SearchResultCard char={item} />
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
            placeholder={`Add Character`}
        >
            <Stack spacing={2}>
                <Stack spacing={1}>{SearchResults}</Stack>
            </Stack>
        </SearchDialog>
    );
}
