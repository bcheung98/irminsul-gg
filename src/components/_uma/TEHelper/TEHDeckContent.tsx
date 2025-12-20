import { useState } from "react";

// Component imports
import TEHSelectorPopup from "./TEHSelectorPopup";
import TEHScenarioPopup from "./TEHScenarioPopup";
import TEHDeckCharacterCard from "./TEHDeckCharacterCard";
import TEHDeckSupportCard from "./TEHDeckSupportCard";
import TEHDeckScenarioCard from "./TEHDeckScenarioCard";
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Type imports
import { TEHDeck, TEHItemCategory } from "@/types/uma/te-helper";

export default function TEHDeckContent({ deck }: { deck: TEHDeck }) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const flexBoxParams = {
        wrap: true,
        sx: {
            alignItems: "flex-start",
            justifyContent: { xs: "center", md: "left" },
        },
    };

    const [supportIndex, setSupportIndex] = useState(0);

    const [searchOpen, setSearchOpen] = useState(false);
    const [category, setCategory] = useState<TEHItemCategory>(null);
    const handleSearchOpen = (type: TEHItemCategory, index = 0) => {
        if (type === "support") {
            setSupportIndex(index);
        }
        setCategory(type);
        setSearchOpen(true);
    };
    const handleSearchClose = () => {
        setSearchOpen(false);
        setCategory(null);
    };

    const [selectOpen, setSelectOpen] = useState(false);
    const handleSelectOpen = () => {
        setSelectOpen(true);
    };
    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                justifyContent={{ xs: "center", md: "left" }}
                sx={{ py: 1 }}
            >
                <Grid size={{ xs: 12, md: "auto" }}>
                    <FlexBox {...flexBoxParams} spacing={2}>
                        <Box onClick={() => handleSearchOpen("character")}>
                            <TEHDeckCharacterCard data={deck.character} />
                        </Box>
                        <Box onClick={() => handleSelectOpen()}>
                            <TEHDeckScenarioCard data={deck.scenario} />
                        </Box>
                    </FlexBox>
                </Grid>
                <Grid size={{ xs: 12, md: "auto" }}>
                    <Divider
                        orientation={matches ? "vertical" : "horizontal"}
                    />
                </Grid>
                <Grid size="grow">
                    <FlexBox {...flexBoxParams} spacing={3}>
                        <FlexBox {...flexBoxParams} spacing={3}>
                            {deck.supports.slice(0, 3).map((card, idx) => (
                                <Box
                                    key={idx}
                                    onClick={() =>
                                        handleSearchOpen("support", idx)
                                    }
                                >
                                    <TEHDeckSupportCard data={card} />
                                </Box>
                            ))}
                        </FlexBox>
                        <FlexBox {...flexBoxParams} spacing={3}>
                            {deck.supports.slice(3, 6).map((card, idx) => (
                                <Box
                                    key={idx}
                                    onClick={() =>
                                        handleSearchOpen("support", idx + 3)
                                    }
                                >
                                    <TEHDeckSupportCard data={card} />
                                </Box>
                            ))}
                        </FlexBox>
                    </FlexBox>
                </Grid>
            </Grid>
            <TEHSelectorPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                handleClose={handleSearchClose}
                category={category}
                index={supportIndex}
            />
            <ContentDialog
                open={selectOpen}
                setOpen={setSelectOpen}
                header="Select Scenario"
                sx={{
                    ".MuiDialog-paper": {
                        maxWidth: "600px",
                    },
                }}
            >
                <TEHScenarioPopup handleClose={handleSelectClose} />
            </ContentDialog>
        </>
    );
}
