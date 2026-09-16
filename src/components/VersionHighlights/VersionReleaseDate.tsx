// Component imports
import Text, { TextWeight } from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import DateObject from "@/helpers/dates";
import { useTimer } from "@/hooks";
import { TypographyProps } from "@mui/material/Typography";

export default function VersionReleaseDate({
    releaseDate,
    color,
    variant = "subtitle1",
    weight = "highlight",
    mode = "release",
}: {
    releaseDate?: string | null;
    color?: string;
    variant?: TypographyProps["variant"];
    weight?: TextWeight;
    mode?: "release" | "daysAgo";
}) {
    const theme = useTheme();

    const date = new DateObject(releaseDate);
    const { timeString, timeRemaining } = useTimer(
        date,
        mode === "daysAgo",
        false,
        ["seconds"],
    );

    const dayText =
        timeRemaining < 0 ? `In ${timeString}` : `${timeString} ago`;

    return mode === "release" ? (
        <Text
            variant={variant}
            weight={weight}
            sx={{ color: color ?? theme.text.primary }}
        >
            {"Release Date: "}
            <Tooltip title={dayText} arrow placement="right">
                <span
                    style={{
                        color: color ?? theme.text.primary,
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
                <Text
                    variant={variant}
                    weight={weight}
                    sx={{ color: color ?? theme.text.primary }}
                >
                    {dayText}
                </Text>
            </Tooltip>
        </div>
    );
}
