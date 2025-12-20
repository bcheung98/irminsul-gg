// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useStore, useServerStore, useTEHelperStore } from "@/stores";
import { scenarios } from "@/data/uma/scenarios";
import { searchResultStyle, TEHInvalidTag } from "./TEHelper.utils";

export default function TEHScenarioPopup({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const { decks, currentDeck, addScenario } = useTEHelperStore();
    const deck = decks[currentDeck];

    let items = scenarios;
    if (hideUnreleasedContent) {
        items = scenarios.filter((scenario) => scenario.global);
    }

    return (
        <Stack spacing={1}>
            {items.map((item) => {
                const invalid = item.id === deck.scenario;
                return (
                    <ButtonBase
                        key={item.id}
                        onClick={() => {
                            if (!invalid) {
                                addScenario(item.id);
                                handleClose();
                            }
                        }}
                        disableRipple={invalid}
                        sx={{
                            display: "inline",
                            "&:hover": {
                                cursor: invalid ? "not-allowed" : "pointer",
                            },
                        }}
                    >
                        <FlexBox sx={searchResultStyle(invalid)}>
                            <TextLabel
                                icon={`uma/scenarios/${item.id}`}
                                iconProps={{ size: 48 }}
                                title={
                                    hideUnreleasedContent
                                        ? item.name
                                        : item.nameJP
                                }
                                spacing={2}
                            />
                        </FlexBox>
                        <TEHInvalidTag invalid={invalid} />
                    </ButtonBase>
                );
            })}
        </Stack>
    );
}
