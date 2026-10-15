// Component imports
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import DateObject from "@/helpers/dates";

export default function NotificationDate({
    date,
    color,
}: {
    date: string;
    color?: string;
}) {
    const theme = useTheme();

    return (
        <InfoChip
            title={new DateObject(date).date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}
            titleProps={{ variant: "body3" }}
            chipProps={{
                padding: "0 12px",
                height: "20px",
                background: color ?? theme.palette.error.dark,
            }}
        />
    );
}
