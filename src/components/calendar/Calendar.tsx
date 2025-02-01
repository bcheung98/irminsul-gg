import "./Calendar.css";
import {
    BaseSyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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
    IconButton,
    Stack,
    Collapse,
    AppBar,
    Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

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

    const calendarRef = useRef<FullCalendar>(null);

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
                        tooltipArrow="bottom"
                    />
                ),
            });
        }
    });

    const storedFilters = localStorage.getItem("calendar/filters") || "null";
    const [filters, setSiteFilters] = useState<string[]>(
        storedFilters !== "null" ? JSON.parse(storedFilters) : []
    );
    const handleFilterChange = (
        _: BaseSyntheticEvent,
        newSiteFilters: string[]
    ) => {
        setSiteFilters(newSiteFilters);
        const jsonFilters = JSON.stringify(newSiteFilters);
        if (jsonFilters !== storedFilters) {
            localStorage.setItem("calendar/filters", jsonFilters);
        }
    };

    useEffect(() => {
        websites.forEach((website) => {
            if (website.enabled) {
                dispatch(fetchBanners({ tag: website.tag, type: "character" }));
                // dispatch(fetchBanners({ tag: website.tag, type: "weapon" }));
            }
        });
        if (storedFilters === "null") {
            setSiteFilters(buttons.map((button) => button.value as string));
        }
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

    const storedDropdownOpen =
        localStorage.getItem("calendar/dropdown") || "null";
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(
        storedDropdownOpen !== "null" ? JSON.parse(storedDropdownOpen) : true
    );
    const toggleDropdownOpen = () => {
        const newState = !dropdownOpen;
        const jsonDropdownOpen = JSON.stringify(newState);
        if (jsonDropdownOpen !== storedDropdownOpen) {
            localStorage.setItem("calendar/dropdown", jsonDropdownOpen);
        }
        setDropdownOpen(newState);
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
                <AppBar
                    position="relative"
                    sx={{
                        borderColor: theme.appbar.selectedHover,
                        px: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    <Container maxWidth="xl" disableGutters>
                        <Toolbar
                            variant="dense"
                            disableGutters
                            sx={{
                                justifyContent: "space-between",
                            }}
                        >
                            <TextStyled variant="h6-styled">
                                Gacha Calendar
                            </TextStyled>
                            <IconButton
                                onClick={toggleDropdownOpen}
                                disableRipple
                                disableTouchRipple
                                sx={{ p: 0 }}
                            >
                                <ExpandMoreIcon
                                    sx={{
                                        width: "32px",
                                        height: "32px",
                                        p: "4px",
                                        transform: dropdownOpen
                                            ? "rotateX(180deg)"
                                            : "rotateX(0deg)",
                                        transition: "transform 0.25s",
                                    }}
                                />
                            </IconButton>
                        </Toolbar>
                        <Collapse in={dropdownOpen} timeout="auto">
                            <Stack sx={{ pb: 1 }}>
                                <TextStyled
                                    variant="body2-styled"
                                    gutterBottom
                                    sx={{ px: 0.5 }}
                                >
                                    Click to filter games
                                </TextStyled>
                                <ToggleButtons
                                    color="primary"
                                    orientation={
                                        matches_up_sm
                                            ? "horizontal"
                                            : "horizontal"
                                    }
                                    buttons={buttons}
                                    value={filters}
                                    onChange={handleFilterChange}
                                    padding={0}
                                    spacing={4}
                                />
                            </Stack>
                        </Collapse>
                    </Container>
                </AppBar>
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
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ mt: 2, px: { xs: 1, sm: 0 } }}
                            alignItems="center"
                        >
                            <InfoIcon
                                fontSize={matches_up_sm ? "medium" : "small"}
                            />
                            <TextStyled>
                                Please note that the dates of all future updates
                                are subject to change
                            </TextStyled>
                        </Stack>
                    </Container>
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
