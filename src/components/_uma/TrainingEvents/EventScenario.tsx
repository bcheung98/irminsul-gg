// Component imports
import EventInfo from "./EventInfo";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Loader from "@/components/Loader";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";

// Type imports
import { UmaScenario } from "@/types/uma/scenario";
import { ScenarioEvents, Event } from "@/types/uma/event";

export default function EventScenario({
    scenario,
    expand = false,
}: {
    scenario: UmaScenario;
    expand?: boolean;
}) {
    const { events } = useUmaContext();

    let scenarioEvents: ScenarioEvents | undefined;
    let eventsWithChoices: Event[] | undefined = [];
    let otherEvents: Event[] | undefined = [];

    if (!events.scenario) return null;

    scenarioEvents = events.scenario.find((s) => s.id === scenario.id);
    if (scenarioEvents) {
        eventsWithChoices = scenarioEvents.events.scenario;
        otherEvents = scenarioEvents.events.random;
    }

    const eventList = {
        "Scenario Events": eventsWithChoices,
        "Random Events": otherEvents,
    };

    return (
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
    );
}
