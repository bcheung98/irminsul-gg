import "./Calendar.css";
import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Component imports
import Image from "custom/Image";
import CalendarEventPopup, { EventPopupInfo } from "./CalendarEventPopup";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    alpha,
    Toolbar,
    Box,
    Dialog,
} from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectBanners } from "reducers/banner";
import { fetchBanners } from "rtk/fetchData";
import { createEventSourceObject } from "helpers/createEventSourceObject";

// Type imports
import { EventSourceObject, Website, WebsiteColorInfo } from "types/common";
import { EventClickArg } from "@fullcalendar/core/index.js";

function Calendar({ websites }: { websites: Website[] }) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const buttons = [] as CustomToggleButtonProps[];
    const colors: WebsiteColorInfo = {};
    websites.forEach((website) => {
        colors[website.tag] = website.color;
        if (website.enabled) {
            buttons.push({
                value: website.tag.toLowerCase(),
                icon: (
                    <Image
                        src={`game-icons/${website.tag}`}
                        alt={website.tag}
                        style={{
                            width: matches_up_md ? "40px" : "32px",
                            borderRadius: "4px",
                        }}
                        tooltip={website.title}
                    />
                ),
            });
        }
    });

    const [filters, setSiteFilters] = useState<string[]>([]);
    const handleFilterChange = (
        _: BaseSyntheticEvent,
        newSiteFilters: string[]
    ) => {
        setSiteFilters(newSiteFilters);
    };

    useEffect(() => {
        websites.forEach((website) => {
            if (website.enabled) {
                dispatch(fetchBanners({ tag: website.tag, type: "character" }));
                // dispatch(fetchBanners({ tag: website.tag, type: "weapon" }));
            }
        });
        setSiteFilters(buttons.map((button) => button.value as string));
    }, [websites]);

    const banners = useAppSelector(selectBanners);

    const eventSources = useMemo(
        () => filterGames(createEventSourceObject(banners, colors), filters),
        [banners, filters]
    );

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [currentEvent, setCurrentEvent] = useState<EventPopupInfo>({
        tag: "",
        title: "",
        characters: [],
    });

    const handleEventClick = (info: EventClickArg) => {
        const { characters, tag } = info.event.extendedProps;
        if (!info.event.title.includes("(Tentative")) {
            setCurrentEvent({
                tag: tag,
                title: info.event.title,
                characters: characters,
            });
            setDialogOpen(true);
        }
    };

    const handleEventHover = (
        info: EventClickArg,
        direction: "enter" | "leave"
    ) => {
        if (!info.event.title.includes("(Tentative")) {
            if (direction === "enter") {
                info.el.style.cursor = "pointer";
            }
        } else {
            info.el.style.cursor = "default";
        }
    };

    return (
        <>
            <Box
                sx={{
                    color: theme.text.primary,
                    fontFamily: theme.font.styled.family,
                    fontWeight: theme.font.styled.weight,
                    borderBottom: `1px solid ${theme.border.color.primary}`,
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        backgroundColor: theme.palette.error.dark,
                    }}
                >
                    <TextStyled sx={{ textAlign: "center" }}>
                        Hello! If you're reading this it means you have stumbled
                        across a secret page that is currently WIP.
                    </TextStyled>
                </Box>
                <Box>
                    <Toolbar
                        disableGutters
                        sx={{
                            backgroundColor: theme.background(2),
                            borderBottom: `1px solid ${theme.border.color.primary}`,
                            flexGrow: 1,
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: "8px",
                            px: { xs: 1, sm: 2, md: 3 },
                            py: 1,
                        }}
                    >
                        <TextStyled variant="h5-styled">
                            Gacha Calendar
                        </TextStyled>
                        <Box>
                            <TextStyled gutterBottom>
                                Click to toggle games
                            </TextStyled>
                            <ToggleButtons
                                color="primary"
                                buttons={buttons}
                                value={filters}
                                onChange={handleFilterChange}
                                highlightOnHover={false}
                                padding={0}
                                spacing={4}
                            />
                        </Box>
                    </Toolbar>
                    <Box
                        sx={{
                            px: { xs: 0, sm: 2, md: 3 },
                            pt: 2,
                            pb: 8,
                            backgroundColor: alpha(theme.background(1), 0.88),
                            backdropFilter: "blur(4px)",
                            minHeight: "75vh",
                        }}
                    >
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            height="auto"
                            buttonText={{ today: "Today" }}
                            eventSources={eventSources}
                            eventOrder="tag"
                            eventOrderStrict={true}
                            eventDisplay="block"
                            displayEventTime={false}
                            titleFormat={{
                                month: matches_up_sm ? "long" : "short",
                                year: "numeric",
                            }}
                            dayHeaderFormat={{
                                weekday: matches_up_sm ? "short" : "narrow",
                            }}
                            eventClick={(info) => handleEventClick(info)}
                            eventMouseEnter={(info) =>
                                handleEventHover(info, "enter")
                            }
                            eventMouseLeave={(info) =>
                                handleEventHover(info, "leave")
                            }
                        />
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <CalendarEventPopup
                    onClose={handleDialogClose}
                    info={currentEvent}
                />
            </Dialog>
        </>
    );
}

export default Calendar;

function filterGames(events: EventSourceObject[], filters: string[]) {
    return events.filter((event) => filters.includes(event.tag.split("/")[0]));
}
