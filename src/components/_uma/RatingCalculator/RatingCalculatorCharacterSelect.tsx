import { useState } from "react";

// Component imports
import TEHDeckCharacterCard from "../TEHelper/TEHDeckCharacterCard";
import RatingCalculatorSelectorPopup from "./RatingCalculatorSelectorPopup";

// MUI imports
import Box from "@mui/material/Box";

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
            <Box onClick={() => handleSearchOpen()}>
                <TEHDeckCharacterCard data={currentCharacter || null} />
            </Box>
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
