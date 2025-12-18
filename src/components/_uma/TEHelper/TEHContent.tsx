import { useState } from "react";

// Component imports
import TEHContentTab, { TEHContentTabIcon } from "./TEHContentTab";
import TEHSettings from "./TEHSettings";
import ContentBox from "@/components/ContentBox";
import { default as Tabs } from "@/components/Tabs";
import Text from "@/components/Text";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useTEHelperStore } from "@/stores";

// Type imports
import { TEHDeckData } from "@/types/uma/te-helper";

export default function TEHContent() {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const { decks, currentDeck, settings } = useTEHelperStore();
    const deck = decks[currentDeck];

    const tabs: TEHDeckData[] = [
        deck.character,
        deck.scenario,
        ...deck.supports,
    ];

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const Content = tabs.slice(0, -1).includes(null) ? (
        <Text weight="highlight" sx={{ p: 2 }}>
            Select a trainee and six supports to begin
        </Text>
    ) : (
        <Grid container sx={{ alignItems: "flex-start" }}>
            {!settings.showAll && (
                <Grid size={{ xs: 12, md: "auto" }}>
                    <Tabs.List
                        value={tabValue}
                        onChange={handleTabChange}
                        orientation={matches ? "vertical" : "horizontal"}
                    >
                        {tabs.map((id, index) => (
                            <Tabs.Selector
                                key={index}
                                icon={
                                    <TEHContentTabIcon
                                        tabValue={tabValue}
                                        index={index}
                                        id={id}
                                    />
                                }
                                sx={{ px: 0, py: 0.5 }}
                            />
                        ))}
                    </Tabs.List>
                </Grid>
            )}
            <Grid size={{ xs: 12, md: "grow" }}>
                <Stack
                    spacing={settings.showAll ? 2 : 0}
                    divider={settings.showAll && <Divider />}
                >
                    {tabs.map((id, index) =>
                        !settings.showAll ? (
                            <Tabs.Panel
                                key={index}
                                index={index}
                                value={tabValue}
                                padding={0}
                            >
                                <TEHContentTab index={index} id={id} />
                            </Tabs.Panel>
                        ) : (
                            <TEHContentTab key={index} index={index} id={id} />
                        )
                    )}
                </Stack>
            </Grid>
        </Grid>
    );

    return (
        <ContentBox
            header="Event Viewer"
            actions={<TEHSettings />}
            contentProps={{ padding: 0 }}
        >
            {Content}
        </ContentBox>
    );
}
