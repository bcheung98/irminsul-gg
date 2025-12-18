import { useCallback, useEffect, useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import SearchBar from "@/components/SearchBar";

// MUI imports
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// Helper imports
import { useTEHelperStore } from "@/stores";

export default function TEHRenameDeck() {
    const { decks, currentDeck, renameDeck } = useTEHelperStore();
    const name = decks[currentDeck].name;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = useCallback((event: React.BaseSyntheticEvent) => {
        setInputValue(event.target.value);
    }, []);

    const handleClickRename = () => {
        handleClose();
        renameDeck(inputValue);
    };

    useEffect(() => {
        setInputValue(name);
    }, [open]);

    return (
        <>
            <Button
                variant="contained"
                color="info"
                onClick={handleClickOpen}
                disableRipple
                startIcon={<DriveFileRenameOutlineIcon />}
                sx={{ p: "4px 16px" }}
            >
                <Text variant="body2" weight="highlight">
                    Rename
                </Text>
            </Button>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                maxWidth="sm"
                header="Rename Deck"
            >
                <Stack spacing={2}>
                    <SearchBar
                        autoFocus
                        placeholder="Rename Deck"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(event: React.KeyboardEvent) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleClickRename();
                            }
                        }}
                        inputIcon={<DriveFileRenameOutlineIcon />}
                        height="32px"
                    />
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
                            color="success"
                            onClick={handleClickRename}
                            disableRipple
                            sx={{ p: "4px 16px" }}
                        >
                            <Text variant="body2" weight="highlight">
                                Rename
                            </Text>
                        </Button>
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
