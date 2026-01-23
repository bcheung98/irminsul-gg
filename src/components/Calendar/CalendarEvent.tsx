import { useState } from "react";

// Component imports
import CalendarEventPopup from "./CalendarEventPopup";
import ContentDialog from "@/components/ContentDialog";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";

// Helper imports
import { getBannerLabel } from "../BannerArchive/BannerArchive.utils";
import { getContrastText } from "@/utils/getContrastText";
import { games } from "@/data/games";

// Type imports
import { EventContentArg } from "@fullcalendar/core/index.js";
import { EventObjectExtendedProps } from "@/types/calendar";
import { SearchResult } from "../SiteSearch";

export default function CalendarEvent({
    eventInfo,
    characters,
    weapons,
}: {
    eventInfo: EventContentArg;
    characters: SearchResult[];
    weapons: SearchResult[];
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { event, isPast } = eventInfo;
    const eventProps = event.extendedProps as EventObjectExtendedProps;
    const { game, color, isCurrent, isFuture } = eventProps;

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const title = getBannerLabel(eventProps, "NA", "version");

    return (
        <>
            <Card
                onClick={handleDialogOpen}
                sx={{
                    px: { xs: 0.25, lg: 1 },
                    border: `2px solid ${color}`,
                    backgroundColor: !isFuture ? color : alpha(color, 0.25),
                    opacity: isCurrent || !isPast ? 1 : 0.5,
                    cursor: "pointer",
                    "&:hover, &:focus": {
                        // outline: !isFuture
                        //     ? `1px solid rgb(200, 200, 200)`
                        //     : "none",
                        backgroundColor: isFuture
                            ? alpha(color, 0.5)
                            : alpha(color, 0.75),
                    },
                }}
            >
                <TextLabel
                    icon={matches && `${game}/_common/Icon`}
                    iconProps={{ size: 20 }}
                    title={`${title}${isFuture ? " *" : ""}`}
                    titleProps={{
                        variant: "body2",
                        color: getContrastText(
                            theme.text.primary,
                            games[game].color,
                        ),
                    }}
                />
            </Card>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                header={
                    <TextLabel
                        icon={`${game}/_common/Icon`}
                        iconProps={{ size: 40 }}
                        title={title}
                        titleProps={{ variant: "h6" }}
                        spacing={2}
                    />
                }
                contentProps={{ padding: "8px 16px 16px" }}
            >
                <CalendarEventPopup
                    eventProps={eventProps}
                    characters={characters}
                    weapons={weapons}
                />
            </ContentDialog>
        </>
    );
}
