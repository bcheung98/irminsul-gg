// Component imports
import EventInfo from "./EventInfo";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Loader from "@/components/Loader";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { CardIDContext, CharIDContext, useUmaContext } from "@/context";
import { rarityMap } from "@/data/uma/common";

// Type imports
import { UmaSupport } from "@/types/uma";
import { Event, PalGroupEvents, SupportEvents } from "@/types/uma/event";

export default function EventSupport({
    support,
    expand = false,
}: {
    support: UmaSupport;
    expand?: boolean;
}) {
    const rarity = rarityMap[support.rarity].toLowerCase() as
        | "r"
        | "sr"
        | "ssr";

    const { events } = useUmaContext();

    let supportEvents: SupportEvents | PalGroupEvents | undefined;
    let chainEvents: Event[] | undefined = [];
    let randomEvents: Event[] | undefined = [];
    let specialEvents: Event[] | undefined = [];

    const isPalOrGroup = ["Pal", "Group"].includes(support.specialty);

    function addHeadersPal(event: Event, index: number) {
        const headers = [];
        if (index === 0) {
            headers.push("first_training");
        }
        if (index === 1) {
            headers.push("after_training");
        }
        if (index === 2) {
            headers.push("after_finals_bond_maxed");
        }
        if (index === 3) {
            headers.push("after_finals_bond_not_maxed");
        }
        if (index === 4) {
            headers.push("new_year_dating");
        }
        return {
            ...event,
            headers: headers,
        };
    }

    if (isPalOrGroup) {
        if (support.specialty === "Pal") {
            supportEvents = events["support-pal"]?.find(
                (e) => e.id === support.charID
            );
            if (supportEvents) {
                chainEvents = supportEvents.events.recreation;
                randomEvents = supportEvents.events.random;
                specialEvents = supportEvents.events.special?.map(
                    (event, index) => addHeadersPal(event, index)
                );
            }
        } else if (support.specialty === "Group") {
            supportEvents = events["support-group"]?.find(
                (e) => e.id === support.id
            );
            if (supportEvents) {
                chainEvents = supportEvents.events.recreation;
                randomEvents = supportEvents.events.random;
                specialEvents = supportEvents.events.special;
            }
        }
    } else {
        supportEvents = events["support-common"]?.find(
            (e) => e.id === support.charID
        );
        if (supportEvents) {
            randomEvents = supportEvents.events.common;
        }
        if (rarity !== "r") {
            chainEvents = events[`support-${rarity}`]?.find(
                (e) => e.id === support.id
            )?.events.chain;
        }
    }

    if (!supportEvents) return <Loader />;

    const eventList = {
        [`${isPalOrGroup ? "Recreation" : "Chain"} Events`]: chainEvents,
        "Random Events": randomEvents,
        "Special Events": specialEvents,
    };

    return (
        <CardIDContext value={support.id}>
            <CharIDContext
                value={
                    support.specialty === "Group"
                        ? support.name
                        : support.charID
                }
            >
                <Stack spacing={2}>
                    {Object.entries(eventList).map(
                        ([title, events], i) =>
                            events &&
                            events.length > 0 && (
                                <Stack key={title} spacing={1}>
                                    <Text weight="highlight">{title}</Text>
                                    <FlexBox
                                        spacing={2}
                                        wrap
                                        sx={{ alignItems: "flex-start" }}
                                    >
                                        {events.map((event, index) => (
                                            <EventInfo
                                                key={index}
                                                event={event}
                                                index={index}
                                                isChain={
                                                    i === 0 &&
                                                    support.specialty !==
                                                        "Group"
                                                }
                                                expand={expand}
                                            />
                                        ))}
                                    </FlexBox>
                                </Stack>
                            )
                    )}
                </Stack>
            </CharIDContext>
        </CardIDContext>
    );
}
