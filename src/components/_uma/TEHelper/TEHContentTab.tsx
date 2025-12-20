import { useMemo, useState } from "react";

// Component imports
import EventCharacter from "../TrainingEvents/EventCharacter";
import EventScenario from "../TrainingEvents/EventScenario";
import EventSupport from "../TrainingEvents/EventSupport";
import TEHSelectorPopup from "./TEHSelectorPopup";
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

// Helper imports
import { useTEHelperStore } from "@/stores";
import { useTEHelperData } from "./TEHelper.utils";
import { scenarios } from "@/data/uma/scenarios";
import { formatTitle } from "@/helpers/uma/formatTitle";

// Type imports
import { TEHDeckData } from "@/types/uma/te-helper";
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { UmaScenario } from "@/types/uma/scenario";

export default function TEHContentTab({
    index,
    id,
}: {
    index: number;
    id: TEHDeckData;
}) {
    const { characters, supports } = useTEHelperData();

    const { settings } = useTEHelperStore();

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };
    const handleSearchClose = () => {
        setSearchOpen(false);
    };

    const getItem = (index: number, id: TEHDeckData) => {
        switch (index) {
            case 0:
                return characters.find((character) => character.id === id);
            case 1:
                return scenarios.find((scenario) => scenario.id === id);
            default:
                return supports.find((support) => support.id === id);
        }
    };

    const item = useMemo(() => getItem(index, id), [index, id]);

    const Events = item ? (
        <>
            {index === 0 && (
                <EventCharacter
                    character={item as UmaCharacter}
                    expand={settings.expanded}
                />
            )}
            {index === 1 && (
                <EventScenario
                    scenario={item as UmaScenario}
                    expand={settings.expanded}
                />
            )}
            {index > 1 && index < 8 && (
                <EventSupport
                    support={item as UmaSupport}
                    expand={settings.expanded}
                />
            )}
            {index === 8 && id !== -1 && (
                <EventSupport
                    support={item as UmaSupport}
                    expand={settings.expanded}
                />
            )}
        </>
    ) : null;

    return (
        <>
            <Stack
                spacing={2}
                sx={{ p: 2 }}
                divider={!settings.showAll && <Divider />}
            >
                <FlexBox spacing={3}>
                    <TextLabel
                        icon={id !== -1 && getImgURL(index, id)}
                        iconProps={{ size: index > 1 ? 48 : 64 }}
                        title={
                            formatTitle(item) || "Events with other characters"
                        }
                        titleProps={{ variant: id !== -1 ? "h6" : "body1" }}
                        href={id !== -1 ? getHref(index, id) : ""}
                        spacing={index > 0 ? 2 : 0}
                    />
                    {index === 8 && (
                        <Button
                            variant="outlined"
                            onClick={handleSearchOpen}
                            disableRipple
                            startIcon={<SearchIcon />}
                            sx={(theme) => ({
                                p: "2px 16px",
                                backgroundColor: theme.background(2),
                                borderRadius: "4px",
                                borderColor: theme.border.color.primary,
                                "&:hover": {
                                    backgroundColor: theme.background(
                                        2,
                                        "light"
                                    ),
                                },
                            })}
                        >
                            <Text variant="subtitle1">Search</Text>
                        </Button>
                    )}
                </FlexBox>
                {Events}
            </Stack>
            <TEHSelectorPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                handleClose={handleSearchClose}
                category="support"
                index={6}
            />
        </>
    );
}

export function TEHContentTabIcon({
    tabValue,
    index,
    id,
}: {
    tabValue: number;
    index: number;
    id: TEHDeckData;
}) {
    return index < 8 ? (
        <Image
            src={getImgURL(index, id)}
            size={64}
            style={{
                opacity: index === tabValue ? 1 : 0.5,
            }}
        />
    ) : (
        <ZoomInIcon
            sx={(theme) => ({
                color: theme.text.primary,
                width: {
                    xs: "48px",
                    md: "64px",
                },
                height: {
                    xs: "48px",
                    md: "64px",
                },
                opacity: index === tabValue ? 1 : 0.5,
            })}
        />
    );
}

const getImgURL = (index: number, id: TEHDeckData) => {
    switch (index) {
        case 0:
            return `uma/characters/${id}`;
        case 1:
            return `uma/scenarios/${id}`;
        default:
            return `uma/supports/${id}_icon`;
    }
};

const getHref = (index: number, id: TEHDeckData) => {
    switch (index) {
        case 0:
            return `/uma/characters/${id}`;
        case 1:
            return ``;
        default:
            return `/uma/supports/${id}`;
    }
};
