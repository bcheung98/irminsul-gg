import { useEffect, useState } from "react";

// Component imports
import TEHDeckContent from "./TEHDeckContent";
import TEHRenameDeck from "./TEHRenameDeck";
import TEHCopyDeck from "./TEHCopyDeck";
import TEHResetDeck from "./TEHResetDeck";
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";

// MUI imports
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

// Helper imports
import { useTEHelperStore } from "@/stores";

export default function TEHHeader() {
    const { decks, currentDeck, setCurrentDeck } = useTEHelperStore();
    const deck = decks[currentDeck];

    const [index, setIndex] = useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
        setCurrentDeck(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
            setCurrentDeck(index - 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index + 1 < decks.length) {
            setIndex(index + 1);
            setCurrentDeck(index + 1);
        }
    };

    const selectProps = {
        index,
        data: decks,
        handleIndexChange,
        handleIndexChangeLeft,
        handleIndexChangeRight,
        disabledLeft: index - 1 === -1,
        disabledRight: index + 1 === decks.length,
    };

    useEffect(() => {
        setIndex(currentDeck);
    }, [deck, index]);

    return (
        <ContentBox
            header={
                <SelectWithArrows {...selectProps} width="100%">
                    {decks.map((deck, index) => (
                        <MenuItem key={index} value={index}>
                            <Text
                                variant="subtitle1"
                                weight="highlight"
                                sx={{ textAlign: "center" }}
                            >
                                {deck.name}
                            </Text>
                        </MenuItem>
                    ))}
                </SelectWithArrows>
            }
        >
            <Stack spacing={1}>
                <TEHDeckContent deck={deck} />
                <FlexBox spacing={2} wrap>
                    <TEHRenameDeck />
                    <TEHCopyDeck />
                    <TEHResetDeck />
                </FlexBox>
            </Stack>
        </ContentBox>
    );
}
