import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useTEHelperStore } from "@/stores";

export default function TEHResetDeck() {
    const theme = useTheme();

    const { decks, currentDeck, resetDeck } = useTEHelperStore();
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

    const handleClickReset = () => {
        handleClose();
        resetDeck(currentDeck);
    };

    return (
        <>
            <Button
                variant="contained"
                color="info"
                onClick={handleClickOpen}
                disableRipple
                startIcon={<RestartAltIcon />}
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
                    Reset
                </Text>
            </Button>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                maxWidth="sm"
                header="Confirm Deck Reset"
            >
                <Stack spacing={2}>
                    <Stack spacing={0.5}>
                        <Text>
                            {"Are you sure you want to reset the contents of "}
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
                            onClick={handleClose}
                            disableRipple
                            sx={{ p: "4px 16px" }}
                        >
                            <Text variant="body2" weight="highlight">
                                Cancel
                            </Text>
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClickReset}
                            disableRipple
                            sx={{ p: "4px 16px" }}
                        >
                            <Text variant="body2" weight="highlight">
                                Reset
                            </Text>
                        </Button>
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
