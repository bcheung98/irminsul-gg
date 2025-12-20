// Component imports
import Text from "@/components/Text";
import EventText from "./EventText";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventRewards(props: {
    rewards: EventRewards[];
    chances?: number[];
}) {
    const rewards = getRewards(props.rewards);

    return (
        <>
            {rewards.map((outcome, index) => (
                <Stack key={index}>
                    {rewards.length > 1 && (
                        <Text
                            variant="body2"
                            weight="highlight"
                            sx={(theme) => ({
                                mb: 1,
                                color: theme.text.uma.highlight,
                            })}
                        >
                            {getRandomText(index, props.chances)}
                        </Text>
                    )}
                    {outcome.map((reward, index) => (
                        <EventText key={index} outcome={reward} />
                    ))}
                </Stack>
            ))}
        </>
    );
}

function getRewards(rewards: EventRewards[]) {
    const res: EventRewards[][] = [];
    const tags = rewards.map((reward) => reward.tag);
    const indexes: number[] = [];
    tags.forEach((tag, index) => tag === "di" && indexes.push(index));
    indexes.push(rewards.length);
    let start = 0;
    indexes.forEach((index) => {
        res.push(rewards.slice(start, index));
        start = index + 1;
    });
    return res;
}

function getRandomText(index: number, chances?: number[]) {
    if (chances) {
        return index === 0
            ? `Randomly either (~${chances[index]}%)`
            : `or (~${chances[index]}%)`;
    } else {
        return index === 0 ? "Randomly either" : "or";
    }
}
