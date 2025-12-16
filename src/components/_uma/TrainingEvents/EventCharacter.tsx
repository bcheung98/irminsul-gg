// Component imports
import EventInfo from "./EventInfo";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Loader from "@/components/Loader";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { CharIDContext, useUmaContext } from "@/context";
import {
    eventMisc,
    eventsCommon,
    eventSlowMetabolism,
} from "@/data/uma/events";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { CharacterEvents, Event } from "@/types/uma/event";

export default function EventCharacter({
    character,
    expand = false,
}: {
    character: UmaCharacter;
    expand?: boolean;
}) {
    const { events } = useUmaContext();

    let characterEvents: CharacterEvents | undefined;
    let outfitEvents: Event[] | undefined = [];
    let eventsWithChoices: Event[] | undefined = [];
    let recEvents: Event[] | undefined = [];
    let secretEvents: Event[] | undefined = [];
    let otherEvents: Event[] = [];

    if (!events.character) return null;
    if (!events["character-outfit"]) return null;

    characterEvents = events.character.find(
        (event) => event.id === character.charID
    );

    outfitEvents = events["character-outfit"].find(
        (char) => char.id === character.id
    )?.events.outfit;

    if (!characterEvents) return <Loader />;

    let commonEvents = eventsCommon({ props: characterEvents.props });
    eventsWithChoices = characterEvents.events.character?.filter(
        (event) => event.options.length > 1 || event.forceHasChoices
    );
    eventsWithChoices?.push(
        eventSlowMetabolism({ props: characterEvents.props })
    );
    recEvents = characterEvents.events.recreation;
    secretEvents = characterEvents.events.secret;
    eventMisc({ props: characterEvents.props }).forEach((event) =>
        otherEvents.push(event)
    );
    characterEvents.events.character
        ?.filter((event) => {
            if (event.forceHasChoices !== undefined && !event.forceHasChoices) {
                return true;
            }
            return event.options.length == 1;
        })
        .forEach((event) => otherEvents.push(event));

    const eventList = {
        "Outfit Events": outfitEvents,
        "Character Events": eventsWithChoices,
        "Recreation Events": recEvents,
        "Secret Events": secretEvents,
        "Special Events": commonEvents,
        "Other Events": otherEvents,
    };

    return (
        <CharIDContext value={character.charID}>
            <Stack spacing={2}>
                {Object.entries(eventList).map(
                    ([title, events]) =>
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
                                            expand={expand}
                                        />
                                    ))}
                                </FlexBox>
                            </Stack>
                        )
                )}
            </Stack>
        </CharIDContext>
    );
}
