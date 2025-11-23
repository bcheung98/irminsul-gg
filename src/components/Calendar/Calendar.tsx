"use client";

import { useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Component imports
import CalendarHeader from "./CalendarHeader";
import CalendarFooter from "./CalendarFooter";
import CalendarEvent from "./CalendarEvent";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Helper imports
import { calendarStyles } from "./Calendar.styles";
import { useCalendarStore, useServerStore } from "@/stores";
import { objectKeys } from "@/utils";
import { gameNames } from "@/data/games";
import { createEventSourceObject } from "@/helpers/calendar";

// Type imports
import { Banner } from "@/types/banner";
import { Game } from "@/types";
import { SearchResult } from "../SiteSearch";

export default function Calendar(props: {
    banners: Record<string, Banner[]>;
    data: SearchResult[];
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const calendarRef = useRef<FullCalendar>(null);
    const calendarApi = () => calendarRef.current?.getApi();

    const server = useServerStore(useShallow((state) => state));
    const settings = useCalendarStore(useShallow((state) => state));

    const enabledGames = gameNames.filter((game) => settings[game].enabled);
    const fullDurationGames = gameNames.filter(
        (game) => settings[game].fullDuration
    );

    const banners = useMemo(() => {
        const data: Record<string, Banner[]> = {};
        objectKeys(props.banners).forEach((banner) => {
            const game = banner.split("/")[0] as Game;
            if (settings[game].enabled) {
                data[banner] = props.banners[banner];
            }
        });
        return data;
    }, [JSON.stringify(enabledGames)]);

    const characters =
        props.data.filter((item) => item.category.endsWith("characters")) || [];
    const weapons =
        props.data.filter((item) => item.category.endsWith("weapons")) || [];

    const eventSources = useMemo(() => {
        return Object.entries(banners).map(([tag, banners]) => {
            const game = tag.split("/")[0] as Game;
            const showFullDuration = fullDurationGames.includes(game);
            return createEventSourceObject({
                tag,
                banners,
                server: server[game],
                showFullDuration,
            });
        });
    }, [banners, JSON.stringify(fullDurationGames)]);

    return (
        <Box>
            <CalendarHeader calendarApi={calendarApi} />
            <Toolbar variant="dense" />
            <Box
                sx={{
                    px: { xs: 0, sm: 2, md: 3 },
                    pb: 4,
                    containerType: "inline-size",
                }}
            >
                <Box sx={calendarStyles}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height="auto"
                        eventSources={eventSources}
                        eventOrder="title"
                        eventOrderStrict={true}
                        eventDisplay="block"
                        displayEventTime={false}
                        headerToolbar={false}
                        fixedWeekCount={false}
                        dayHeaderFormat={{
                            weekday: matches ? "short" : "narrow",
                        }}
                        eventContent={(info) => (
                            <CalendarEvent
                                eventInfo={info}
                                characters={characters}
                                weapons={weapons}
                            />
                        )}
                    />
                </Box>
                <CalendarFooter />
            </Box>
        </Box>
    );
}
