import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// Helper imports
import DateObject from "@/helpers/dates";

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

    const dateObj = new DateObject(props.date, server);
    const date = dateObj.date.getTime();
    const initialTime = date - new Date().getTime();
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const diff = date - now;
            setTimeRemaining(() => {
                if (diff < 0) {
                    clearInterval(timerInterval);
                    return 0;
                } else {
                    return diff;
                }
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [date]);

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const countdownArr = [];
    days > 0 && countdownArr.push(`${days}d`);
    days + hours > 0 && countdownArr.push(`${hours}h`);
    days + hours + minutes > 0 && countdownArr.push(`${minutes}m`);
    countdownArr.push(`${seconds}s`);

    return (
        <Text variant="body2" sx={{ color: textColor }}>
            {timeRemaining > 0 ? (
                <>
                    {`${startText || "Ends in"} `}
                    <Tooltip
                        title={dateObj.timeString}
                        arrow
                        placement="bottom"
                    >
                        <Text
                            component="span"
                            variant="body2"
                            weight="highlight"
                            sx={{
                                textDecoration: "underline dotted",
                                cursor: "help",
                            }}
                        >
                            {countdownArr.join(" ")}
                        </Text>
                    </Tooltip>
                </>
            ) : (
                <>{endText}</>
            )}
        </Text>
    );
}
