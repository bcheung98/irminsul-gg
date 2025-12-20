// Component imports
import Text from "@/components/Text";
import EventConditions from "./EventConditions";
import EventOptions from "./EventOptions";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";
import { trainingEventContents } from "@/data/uma/eventText";
import { getScenarioLink } from "@/helpers/uma/events";

// Type imports
import { Event } from "@/types/uma/event";

export default function EventPopup({
    name,
    event,
}: {
    name: string;
    event: Event;
}) {
    const theme = useTheme();

    const { profiles } = useUmaContext();

    const { options, conditions, altOutcome, scenarioLink, relevantChar } =
        event;

    const hasConditions = conditions && conditions?.length > 0;

    const headers: string[] = [];
    if (event.headers) {
        event.headers.forEach((header) =>
            headers.push(trainingEventContents[header])
        );
    }
    if (relevantChar) {
        const character = profiles.find(
            (character) => character.id === relevantChar
        );
        headers.push(`※ ${character?.name}` || "");
    }

    return (
        <Box
            sx={{
                p: 1,
                minWidth: "150px",
                maxWidth: "300px",
                backgroundColor: theme.background(0, "light"),
            }}
        >
            <Text
                variant="body2"
                weight="highlight"
                sx={{
                    mb: hasConditions ? 2 : 0.5,
                }}
            >
                {name}
            </Text>
            {headers.length > 0 && <EventHeaders headers={headers} />}
            <Stack spacing={2}>
                {hasConditions && <EventConditions conditions={conditions} />}
                <Box>
                    {hasConditions && (
                        <Text
                            variant="body2"
                            weight="highlight"
                            sx={{ mb: 0.5 }}
                        >
                            Rewards:
                        </Text>
                    )}
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
                                <Text variant="body2">※ Alternate outcome</Text>
                                <EventOptions options={altOutcome} />
                            </>
                        )}
                        {scenarioLink && (
                            <Text variant="body2">
                                {getScenarioLink(scenarioLink)}
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Stack>
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
