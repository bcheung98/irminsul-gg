// Component imports
import Text, { TextWeight } from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// Helper imports
import { countText } from "@/utils";
import DateObject from "@/helpers/dates";

export default function VersionReleaseDate({
    releaseDate = "1970-01-01 00:00:00 UTC+0",
    weight = "highlight",
    variant = "release",
}: {
    releaseDate?: string | null;
    weight?: TextWeight;

    variant?: "release" | "daysAgo";
}) {
    if (!releaseDate) return null;

    const dateObj = new DateObject(releaseDate);
    const timeRemaining = dateObj.date.getTime() - Date.now();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    const isFuture = days > 0;
    const count = Math.abs(days).toLocaleString("en-us");
    const dayCount = countText({ count: days, single: "day" });
    const dayText =
        days === 0
            ? "Today"
            : isFuture
              ? `In ${count} ${dayCount}`
              : `${count} ${dayCount} ago`;

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
                    {dateObj.string}
                </span>
            </Tooltip>
        </Text>
    ) : (
        <div style={{ width: "max-content" }}>
            <Tooltip title={dateObj.string} arrow placement="right">
                <Text variant="subtitle1" weight={weight}>
                    {dayText}
                </Text>
            </Tooltip>
        </div>
    );
}
