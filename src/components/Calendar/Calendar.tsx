"use client";

import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Component imports
import CalendarHeader from "./CalendarHeader";
import CalendarFooter from "./CalendarFooter";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Helper imports
import { calendarStyles } from "./Calendar.styles";

// Type imports
import { Banner } from "@/types/banner";

export default function Calendar({
    banners,
}: {
    banners: Record<string, Banner[]>;
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const calendarRef = useRef<FullCalendar>(null);
    const calendarApi = () => calendarRef.current?.getApi();

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
                        headerToolbar={false}
                        fixedWeekCount={false}
                        dayHeaderFormat={{
                            weekday: matches ? "short" : "narrow",
                        }}
                    />
                </Box>
                <CalendarFooter />
            </Box>
        </Box>
    );
}
