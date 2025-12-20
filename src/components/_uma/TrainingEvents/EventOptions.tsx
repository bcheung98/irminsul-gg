// Component imports
import Text from "@/components/Text";
import EventRewards from "./EventRewards";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { getOptionTag } from "@/helpers/uma/events";

// Type imports
import type { EventOptions } from "@/types/uma/event";

export default function EventOptions({ options }: { options: EventOptions[] }) {
    return options.map((option, index) => (
        <Stack
            spacing={1}
            key={index}
            sx={(theme) => ({
                p: 1,
                borderRadius: "4px",
                backgroundColor: theme.background(1),
            })}
        >
            {options.length > 1 && (
                <Text variant="body2" weight="highlight">
                    {getOptionTag(index + 1, options.length)}
                </Text>
            )}
            <Stack spacing={1}>
                <EventRewards
                    rewards={option.rewards}
                    chances={option.chances}
                />
            </Stack>
        </Stack>
    ));
}
