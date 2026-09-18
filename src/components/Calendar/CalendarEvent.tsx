import { useState } from "react";

// Component imports
import CalendarEventPopup from "./CalendarEventPopup";
import ContentDialog from "@/components/ContentDialog";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { getBannerLabel } from "../BannerArchive/BannerArchive.utils";
import { getContrastText } from "@/utils/getContrastText";
import { games } from "@/data/games";
import { useCalendarStore } from "@/stores";

// Type imports
import type { EventContentArg } from "@fullcalendar/core/index.js";
import type { EventObjectExtendedProps } from "@/types/calendar";
import type { SearchResult } from "../SiteSearch";

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

    const view = useCalendarStore((state) => state.view);

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [dropdownOpen, setDropdownOpen] = useState(
        isCurrent || (isFuture && eventProps.rateUps.length > 0),
    );
    const toggleDropdownState = () => {
        setDropdownOpen(() => !dropdownOpen);
    };

    const icon = `${game}/_common/Icon`;
    const titleBase = getBannerLabel(eventProps, "NA", "version");
    const title = `${titleBase}${isFuture ? " *" : ""}`;

    const textColor = isFuture
        ? theme.text.primary
        : getContrastText(theme.text.primary, games[game].color);

    const backgroundColor = !isFuture ? color : alpha(color, 0.25);
    const backgroundColorHover = isFuture
        ? alpha(color, 0.5)
        : alpha(color, 0.75);

    const opacity = isCurrent || !isPast ? 1 : 0.5;

    const label =
        matches && view === "listMonth" ? (
            <ButtonBase
                disableRipple
                onClick={toggleDropdownState}
                sx={{
                    px: 3,
                    py: 1,
                    width: "100%",
                    justifyContent: "space-between",
                    opacity,
                    backgroundColor,
                    "&:hover": {
                        backgroundColor: backgroundColorHover,
                    },
                }}
            >
                <TextLabel
                    icon={icon}
                    iconProps={{ size: 28 }}
                    title={title}
                    titleProps={{ color: textColor }}
                    spacing={1.5}
                />
                <ExpandMoreIcon
                    fontSize={matches ? "medium" : "small"}
                    sx={{
                        color: textColor,
                        transform: dropdownOpen
                            ? `rotateZ(0deg)`
                            : `rotateZ(-90deg)`,
                        transition: "transform 0.25s",
                    }}
                />
            </ButtonBase>
        ) : (
            <TextLabel
                icon={(matches || view === "listMonth") && icon}
                iconProps={{ size: view === "listMonth" ? 24 : 20 }}
                title={title}
                titleProps={{
                    variant: "body2",
                    color: textColor,
                }}
            />
        );

    const eventContent = (
        <CalendarEventPopup
            eventProps={eventProps}
            characters={characters}
            weapons={weapons}
        />
    );

    return matches && view === "listMonth" ? (
        <Stack spacing={1}>
            {label}
            <Collapse in={dropdownOpen} timeout="auto">
                <Box style={{ padding: "4px 32px 8px 32px" }}>
                    {eventContent}
                </Box>
            </Collapse>
        </Stack>
    ) : (
        <>
            <Card
                onClick={handleDialogOpen}
                sx={{
                    px: { xs: view === "listMonth" ? 1 : 0.25, lg: 1 },
                    py: { xs: view === "listMonth" ? 0.5 : 0, md: 0 },
                    border: `2px solid ${color}`,
                    backgroundColor,
                    opacity,
                    cursor: "pointer",
                    "&:hover, &:focus": {
                        backgroundColor: backgroundColorHover,
                    },
                }}
            >
                {label}
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
                        title={titleBase}
                        titleProps={{ variant: "h6" }}
                        spacing={2}
                    />
                }
                contentProps={{ padding: "8px 16px 16px" }}
            >
                {eventContent}
            </ContentDialog>
        </>
    );
}
