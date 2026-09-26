import { useCallback, useEffect, useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import SearchBar from "@/components/SearchBar";
import InfoButton from "@/components/InfoButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// Helper imports
import { useTEHelperStore } from "@/stores";

export default function TEHRenameDeck() {
    const theme = useTheme();

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
            <InfoButton
                title="Rename"
                icons={{ start: DriveFileRenameOutlineIcon }}
                onClick={handleClickOpen}
            />
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
                        <InfoButton
                            title="Cancel"
                            onClick={handleClose}
                            color={theme.background(0, "light")}
                            icons={false}
                        />
                        <InfoButton
                            title="Rename"
                            onClick={handleClickRename}
                            icons={false}
                        />
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
