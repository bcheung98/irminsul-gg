import { useState } from "react";

// Component imports
import TEHDeckCharacterCard from "../TEHelper/TEHDeckCharacterCard";
import RatingCalculatorSelectorPopup from "./RatingCalculatorSelectorPopup";
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";

// Helper imports
import { useRatingCalculatorStore } from "@/stores";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";

export default function RatingCalculatorCharacterSelect() {
    const { characters } = useTEHelperData();
    const { character, addCharacter, addAptitude } = useRatingCalculatorStore();
    const [currentCharacter, setCurrentCharacter] = useState<number | null>(
        character,
    );

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };
    const handleSearchClose = () => {
        setSearchOpen(false);
    };

    const handleSelect = (id: number | null) => {
        setCurrentCharacter(id);
        addCharacter(id);
        const char = characters.find((c) => c.id === id);
        if (char) {
            addAptitude(char.aptitude);
        }
    };

    return (
        <>
            <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                        onClick={() => handleSearchOpen()}
                        sx={{ cursor: "pointer" }}
                    >
                        <TEHDeckCharacterCard data={currentCharacter || null} />
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={handleSearchOpen}
                    startIcon={<LoopIcon />}
                >
                    <Text variant="subtitle2" weight="highlight">
                        Change Uma
                    </Text>
                </Button>
            </Stack>
            <RatingCalculatorSelectorPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                handleClose={handleSearchClose}
                addCharacter={handleSelect}
            />
        </>
    );
}
