import { useState } from "react";

// Component imports
import TEHDeckCharacterCard from "./TEHDeckCharacterCard";
import TEHDeckSupportCard from "./TEHDeckSupportCard";
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Helper imports
import { useTEHelperStore } from "@/stores";

// Type imports
import { TEHDeck } from "@/types/uma/te-helper";

export default function TEHCopyDeck() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { decks, currentDeck, copyDeck, setCurrentDeck } = useTEHelperStore();
    const deck = decks[currentDeck];
    const name = deck.name;

    const isDeckEmpty =
        deck.character === null &&
        deck.supports.slice(0, 6).every((i) => i === null);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = (index: number) => {
        setCurrentIndex(index);
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleCopy = () => {
        copyDeck(currentIndex);
        setCurrentDeck(currentIndex);
        handleAlertClose();
        handleClose();
    };

    function DeckRow({ deck }: { deck: TEHDeck }) {
        return (
            <FlexBox
                spacing={2}
                wrap
                sx={{
                    alignItems: "flex-start",
                    justifyContent: { xs: "center", md: "left" },
                }}
            >
                <TEHDeckCharacterCard data={deck.character} mini />
                {deck.supports.slice(0, 6).map((support, index) => (
                    <TEHDeckSupportCard key={index} data={support} mini />
                ))}
            </FlexBox>
        );
    }

    return (
        <>
            <Button
                variant="contained"
                color="info"
                onClick={handleClickOpen}
                disableRipple
                startIcon={<ContentCopyIcon />}
                disabled={isDeckEmpty}
                sx={{
                    p: "4px 16px",
                    "&.Mui-disabled": {
                        backgroundColor: theme.palette.info.main,
                        color: theme.text.primary,
                        opacity: 0.5,
                    },
                }}
            >
                <Text variant="body2" weight="highlight">
                    Copy
                </Text>
            </Button>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                maxWidth="md"
                fullScreen={!matches}
                header="Copy Deck"
                scroll="paper"
            >
                <Stack spacing={2}>
                    <Text weight="highlight">
                        Copy the current deck to another slot
                    </Text>
                    <Stack spacing={1} divider={<Divider />}>
                        <div>
                            <DeckRow deck={deck} />
                            <Text
                                variant="h5"
                                sx={{ textAlign: { xs: "center", sm: "left" } }}
                            >
                                ↓↓↓↓↓
                            </Text>
                        </div>
                        {decks.map((deck, index) => (
                            <Stack key={index} spacing={1}>
                                <Text variant="body2" weight="highlight">
                                    {deck.name}
                                </Text>
                                <FlexBox spacing={[1, 2]} wrap>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => handleAlertOpen(index)}
                                        disableRipple
                                        disabled={index === currentDeck}
                                        sx={{
                                            p: "4px 16px",
                                            "&.Mui-disabled": {
                                                backgroundColor:
                                                    theme.palette.info.main,
                                                color: theme.text.primary,
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <Text
                                            variant="body2"
                                            weight="highlight"
                                        >
                                            Copy here
                                        </Text>
                                    </Button>
                                    <DeckRow deck={deck} />
                                </FlexBox>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </ContentDialog>
            <ContentDialog
                open={alertOpen}
                setOpen={setAlertOpen}
                onClose={handleAlertClose}
                maxWidth="sm"
                fullWidth
                header="Confirm Overwrite"
            >
                <Stack spacing={2}>
                    <Stack spacing={0.5}>
                        <Text>
                            {
                                "Are you sure you want to overwrite the contents of "
                            }
                            <span
                                style={{
                                    color: theme.text.zzz.value,
                                    fontWeight: theme.font.weight.highlight,
                                }}
                            >
                                {decks[currentIndex].name}
                            </span>
                            {" with "}
                            <span
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                }}
                            >
                                {name}
                            </span>
                            {"?"}
                        </Text>
                        <Text
                            weight="highlight"
                            sx={{ color: theme.text.header }}
                        >{`This action cannot be undone.`}</Text>
                    </Stack>
                    <FlexBox
                        spacing={[1, 2]}
                        wrap
                        sx={{ justifyContent: "right" }}
                    >
                        <Button
                            variant="contained"
                            color="info"
                            onClick={handleAlertClose}
                            disableRipple
                            sx={{ p: "4px 16px" }}
                        >
                            <Text variant="body2" weight="highlight">
                                Cancel
                            </Text>
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleCopy}
                            disableRipple
                            sx={{ p: "4px 16px" }}
                        >
                            <Text variant="body2" weight="highlight">
                                Overwrite
                            </Text>
                        </Button>
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
