// Component imports
import Text, { TextWeight } from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// Helper imports
import DateObject from "@/helpers/dates";
import { useTimer } from "@/hooks";

export default function VersionReleaseDate({
    releaseDate,
    weight = "highlight",
    variant = "release",
}: {
    releaseDate?: string | null;
    weight?: TextWeight;
    variant?: "release" | "daysAgo";
}) {
    const date = new DateObject(releaseDate);
    const { timeString, timeRemaining } = useTimer(
        date,
        variant === "daysAgo",
        false,
        ["seconds"],
    );

    const dayText =
        timeRemaining < 0 ? `In ${timeString}` : `${timeString} ago`;

    return variant === "release" ? (
        <Text variant="subtitle1" weight={weight}>
            {"Release Date: "}
            <Tooltip title={dayText} arrow placement="right">
                <span
                    style={{
                        textDecoration: "underline dotted",
                        cursor: "help",
                    }}
                >
                    {date.string}
                </span>
            </Tooltip>
        </Text>
    ) : (
        <div style={{ width: "max-content" }}>
            <Tooltip title={date.string} arrow placement="right">
                <Text variant="subtitle1" weight={weight}>
                    {dayText}
                </Text>
            </Tooltip>
        </div>
    );
}
