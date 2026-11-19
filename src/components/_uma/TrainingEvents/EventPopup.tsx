// Component imports
import Text from "@/components/Text";
import EventConditions from "./EventConditions";
import EventOptions from "./EventOptions";
import EventInteractions, {
    EventInteractionProvider,
    getEventInteraction,
} from "./EventInteractions";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";
import { trainingEventContents } from "@/data/uma/eventText";
import { getScenarioLink } from "@/helpers/uma/events";
import { years, months, times } from "@/helpers/uma/events";

// Type imports
import type { Event } from "@/types/uma/event";

export default function EventPopup({
    name,
    event,
}: {
    name: string;
    event: Event;
}) {
    const theme = useTheme();

    const { profiles } = useUmaContext();

    const {
        options,
        conditions,
        altOutcome,
        scenarioLink,
        relevantChar,
        turn,
    } = event;

    const hasConditions = conditions && conditions?.length > 0;

    const headers: string[] = [];
    if (event.headers) {
        event.headers.forEach((header) =>
            headers.push(trainingEventContents[header]),
        );
    }
    if (relevantChar) {
        const character = profiles.find(
            (character) => character.id === relevantChar,
        );
        headers.push(`※ ${character?.name}` || "");
    }

    const interaction = getEventInteraction(event);
    console.log(interaction)

    return (
        <Box
            sx={{
                p: 1,
                minWidth: "150px",
                maxWidth: "400px",
                backgroundColor: theme.background(0, "light"),
            }}
        >
            <Stack
                spacing={0.5}
                sx={{
                    mb: hasConditions ? 2 : 0.5,
                }}
            >
                <Text variant="body2" weight="highlight">
                    {name}
                </Text>
                {turn && <Text variant="body2">{getTurnDate(turn)}</Text>}
            </Stack>
            {headers.length > 0 && <EventHeaders headers={headers} />}
            <EventInteractionProvider key={event.id} interaction={interaction}>
                <Stack spacing={2}>
                    {hasConditions && (
                        <EventConditions conditions={conditions} />
                    )}
                    <Stack spacing={1}>
                        <EventInteractions />
                        <Stack spacing={1}>
                            {options.length > 0 ? (
                                <EventOptions options={options} />
                            ) : (
                                <Stack
                                    sx={{
                                        p: 1,
                                        borderRadius: "4px",
                                        backgroundColor: theme.background(1),
                                    }}
                                >
                                    <Text variant="body2">Nothing happens</Text>
                                </Stack>
                            )}
                            {altOutcome && (
                                <>
                                    <Text variant="body2">
                                        ※ Alternate outcome
                                    </Text>
                                    <EventOptions options={altOutcome} />
                                </>
                            )}
                            {scenarioLink && (
                                <Text variant="body2">
                                    {getScenarioLink(scenarioLink)}
                                </Text>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </EventInteractionProvider>
        </Box>
    );
}

function EventHeaders({ headers }: { headers: string[] }) {
    return headers.map((header, index) => (
        <Text key={index} variant="body2" sx={{ mb: "4px" }}>
            {header}
        </Text>
    ));
}

function getTurnDate(r: number) {
    const [y, m, h] = [
        Math.floor((r - 1) / 24),
        Math.floor(((r = ((r - 1) % 24) + 1) - 1) / 2),
        r % 2 == 1 ? 0 : 1,
    ];
    return `${years[y]} Year, ${times[h]} ${months[m]}`;
}
