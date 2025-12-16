// Component imports
import EventText from "./EventText";
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";

// Type imports
import { EventRewards } from "@/types/uma/event";

export default function EventConditions({
    conditions,
}: {
    conditions: EventRewards[];
}) {
    return (
        <Box sx={(theme) => ({ color: theme.text.primary })}>
            <Text variant="body2" weight="highlight">
                Conditions:
            </Text>
            <Box>
                <ul>
                    {conditions.map((con, index) => (
                        <li key={index}>
                            <EventText outcome={con} />
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}
