// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// Helper imports
import DateObject from "@/helpers/dates";
import { useTimer } from "@/hooks";

// Type imports
import { Server } from "@/types";

export default function Countdown(props: {
    date: string;
    server: Server;
    startText?: string;
    endText?: string;
    textColor?: string;
}) {
    const { server, startText, endText, textColor } = props;

    const date = new DateObject(props.date, server);

    const { timeString, timeRemaining } = useTimer(date, false, true);

    return (
        <Text variant="body2" sx={{ color: textColor }}>
            {timeRemaining > 0 ? (
                <>
                    {`${startText || "Ends in"} `}
                    <Tooltip title={date.timeString} arrow placement="bottom">
                        <Text
                            component="span"
                            variant="body2"
                            weight="highlight"
                            sx={{
                                textDecoration: "underline dotted",
                                cursor: "help",
                            }}
                        >
                            {timeString}
                        </Text>
                    </Tooltip>
                </>
            ) : (
                <Text component="span" variant="body2" weight="highlight">
                    {endText}
                </Text>
            )}
        </Text>
    );
}
