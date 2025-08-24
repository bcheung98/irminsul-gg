import "./Calendar.css";
import { useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Component imports
import CalendarEvent from "./CalendarEvent";
import Image from "custom/Image";
import { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    alpha,
    Box,
    Stack,
    Container,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectBanners } from "reducers/banner";
import { fetchBanners } from "rtk/fetchData";
import { createEventSourceObject } from "helpers/createEventSourceObject";

// Type imports
import { EventSourceObject, Website, WebsiteColorInfo } from "types/common";
import { selectDisplay, selectFilters, setFilters } from "reducers/calendar";

function Calendar({ websites }: { websites: Website[] }) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const calendarRef = useRef<FullCalendar>(null);

    const banners = useAppSelector(selectBanners);
    const filters = useAppSelector(selectFilters);
    const showDuration = useAppSelector(selectDisplay);

    const buttons = [] as CustomToggleButtonProps[];
    const colors: WebsiteColorInfo = {};
    websites.forEach((website) => {
        colors[website.tag] = website.color;
        if (website.enabled && !["Endfield"].includes(website.tag)) {
            buttons.push({
                value: website.tag.toLowerCase(),
                icon: (
                    <Image
                        src={`game-icons/${website.tag}`}
                        alt={website.tag}
                        style={{
                            width: matches_up_md ? "36px" : "32px",
                            borderRadius: "4px",
                        }}
                        tooltip={website.title}
                        tooltipArrow="bottom"
                    />
                ),
            });
        }
        if (filters.includes("NULL")) {
            dispatch(
                setFilters(buttons.map((button) => button.value as string))
            );
        }
    });

    useEffect(() => {
        websites.forEach((website) => {
            if (website.enabled && !["Endfield"].includes(website.tag)) {
                dispatch(fetchBanners({ tag: website.tag, type: "character" }));
            }
            if (website.enabled && website.tag === "Uma") {
                dispatch(fetchBanners({ tag: website.tag, type: "support" }));
            }
        });
    }, [websites]);

    const eventSources = useMemo(
        () =>
            filterGames(
                createEventSourceObject({ banners, colors, showDuration }),
                filters
            ),
        [banners, filters, showDuration]
    );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                px: { xs: 0, sm: 2, md: 3 },
                pt: 2,
                pb: 8,
                backgroundColor: alpha(theme.background(0), 0.75),
            }}
        >
            <Container maxWidth="xl" disableGutters>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    buttonText={{ today: "Today" }}
                    eventSources={eventSources}
                    eventOrder="title"
                    eventOrderStrict={true}
                    eventDisplay="block"
                    displayEventTime={false}
                    fixedWeekCount={false}
                    titleFormat={{
                        month: matches_up_sm ? "long" : "short",
                        year: "numeric",
                    }}
                    dayHeaderFormat={{
                        weekday: matches_up_sm ? "short" : "narrow",
                    }}
                    eventContent={(info) => (
                        <CalendarEvent eventInfo={info} websites={websites} />
                    )}
                />
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, px: { xs: 1, sm: 0 } }}
                    alignItems="center"
                >
                    <InfoIcon fontSize={matches_up_sm ? "medium" : "small"} />
                    <TextStyled>
                        Please note that the dates of all future updates are
                        subject to change
                    </TextStyled>
                </Stack>
            </Container>
        </Box>
    );
}

export default Calendar;

function filterGames(events: EventSourceObject[], filters: string[]) {
    return events.filter((event) => filters.includes(event.tag.split("/")[0]));
}
