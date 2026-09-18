"use client";

import { useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

// Component imports
import CalendarHeader from "./CalendarHeader";
import CalendarFooter from "./CalendarFooter";
import CalendarEvent from "./CalendarEvent";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

// Helper imports
import { getCalendarStyles } from "./Calendar.styles";
import { useCalendarStore, useServerStore } from "@/stores";
import { objectKeys } from "@/utils";
import { gameNames } from "@/data/games";
import { createEventSourceObject } from "@/helpers/calendar";

// Type imports
import type { Banner } from "@/types/banner";
import type { Game } from "@/types";
import type { SearchResult } from "@/components/SiteSearch";

export default function Calendar(props: {
    banners: Record<string, Banner[]>;
    data: SearchResult[];
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const calendarRef = useRef<FullCalendar>(null);
    const calendarApi = () => calendarRef.current?.getApi();

    const server = useServerStore(useShallow((state) => state));
    const settings = useCalendarStore(useShallow((state) => state));

    const { view, firstDay } = settings;
    const initialView = view ?? (matches ? "dayGridMonth" : "listMonth");

    const enabledGames = gameNames.filter((game) => settings[game].enabled);
    const fullDurationGames = gameNames.filter(
        (game) => settings[game].fullDuration,
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
        props.data.filter(
            (item) =>
                item.category.endsWith("weapons") ||
                item.category.endsWith("supports"),
        ) || [];

    const eventSources = useMemo(() => {
        return Object.entries(banners).map(([tag, banners]) => {
            const game = tag.split("/")[0] as Game;
            return createEventSourceObject({
                tag,
                banners,
                server: server[game],
                showFullDuration:
                    view !== "listMonth" && fullDurationGames.includes(game),
            });
        });
    }, [
        view,
        banners,
        JSON.stringify(server),
        JSON.stringify(fullDurationGames),
    ]);

    const styles = getCalendarStyles(initialView);

    return (
        <Box>
            <CalendarHeader calendarApi={calendarApi} />
            <Toolbar variant="dense" />
            <Container
                maxWidth={view === "listMonth" && "lg"}
                sx={{
                    px: view === "listMonth" ? 0 : { xs: 0, sm: 2, md: 3 },
                    pb: 4,
                    containerType: "inline-size",
                }}
            >
                <Box sx={styles}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, listPlugin]}
                        initialView={initialView}
                        firstDay={firstDay}
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
            </Container>
        </Box>
    );
}
