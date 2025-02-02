import { useState } from "react";

// Component imports
import CalendarEventPopup from "./CalendarEventPopup";
import { Text } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, alpha, Paper, Dialog } from "@mui/material";

// Type imports
import { EventContentArg } from "@fullcalendar/core/index.js";
import { EventObjectExtendedProps, Website } from "types/common";

function CalendarEvent({
    eventInfo,
    websites,
}: {
    eventInfo: EventContentArg;
    websites: Website[];
}) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const { isPast } = eventInfo;
    const {
        tag,
        version = "0.0",
        subVersion = "0.0.0",
        futureVersion,
        start,
        end,
        characters = [],
        color,
    } = eventInfo.event.extendedProps as EventObjectExtendedProps;

    const opacity = isPast ? 0.5 : 1;
    const backgroundColor = !futureVersion ? color : alpha(color, 0.25);

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        if (!futureVersion) {
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const { urls } = websites.find((website) => website.tag === tag)!;

    const parseSubVersion = `Phase ${subVersion.split(".").slice(-1)[0]}`;
    const shortTitle = `${tag} ${version} ${parseSubVersion}`;
    const longTitle = `${
        matches_up_sm ? "Version" : ""
    } ${version} - ${parseSubVersion}`;

    return (
        <>
            <Paper
                onClick={handleDialogOpen}
                sx={{
                    border: `2px solid ${color}`,
                    px: { xs: 0.25, sm: 1 },
                    backgroundColor: backgroundColor,
                    opacity: opacity,
                    cursor: !futureVersion ? "pointer" : "default",
                    "&:hover, &:focus": {
                        outline: !futureVersion
                            ? `2px solid rgb(200, 200, 200)`
                            : "none",
                    },
                }}
            >
                <Text
                    noWrap
                    sx={{
                        fontSize: {
                            xs: "0.625rem !important",
                            sm: "0.75rem !important",
                        },
                    }}
                >
                    {`${futureVersion ? "* " : ""}${shortTitle}`}
                </Text>
            </Paper>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <CalendarEventPopup
                    onClose={handleDialogClose}
                    info={{
                        tag,
                        title: longTitle,
                        characters,
                        urls,
                        start,
                        end,
                    }}
                />
            </Dialog>
        </>
    );
}

export default CalendarEvent;
