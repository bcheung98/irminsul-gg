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
import { StyledTooltip } from "styled/StyledTooltip";

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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
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
                        tooltipArrow="left"
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

    const [showButtons, setShowButtons] = useState(true);
    const toggleShowButtons = () => {
        setShowButtons(!showButtons);
    };

    const baseIconStyle = {
        width: "32px",
        height: "32px",
        padding: "4px",
        transition: "transform 0.25s",
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
                        p: 1,
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
                        variant="dense"
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
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TextStyled variant="h5-styled">
                                Gacha Calendar
                            </TextStyled>
                            <StyledTooltip
                                title="Release dates of all future updates are subject to change"
                                arrow
                                placement="right"
                            >
                                <InfoIcon />
                            </StyledTooltip>
                        </Stack>
                        <IconButton
                            onClick={toggleShowButtons}
                            disableRipple
                            disableTouchRipple
                        >
                            {matches_up_sm ? (
                                <MenuOpenIcon
                                    sx={{
                                        ...baseIconStyle,
                                        ...{
                                            transform: showButtons
                                                ? "rotateY(0deg)"
                                                : "rotateY(180deg)",
                                        },
                                    }}
                                />
                            ) : (
                                <ExpandMoreIcon
                                    sx={{
                                        ...baseIconStyle,
                                        ...{
                                            transform: showButtons
                                                ? "rotateZ(0deg)"
                                                : "rotateZ(180deg)",
                                        },
                                    }}
                                />
                            )}
                        </IconButton>
                    </Toolbar>
                    <Grid
                        container
                        spacing={{ xs: 1, sm: 2, md: 3 }}
                        direction={{ xs: "column-reverse", sm: "row" }}
                        sx={{
                            px: { xs: 0, sm: 2, md: 3 },
                            pt: 2,
                            pb: 8,
                            backgroundColor: alpha(theme.background(1), 0.88),
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <Grid size={{ sm: "grow" }}>
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                height="80vh"
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
                        </Grid>
                        <Grid
                            size="auto"
                            sx={{
                                px: { xs: 1, sm: 0 },
                                display: showButtons ? "flex" : "none",
                                mt: { sm: "56px" },
                            }}
                        >
                            <ToggleButtons
                                color="primary"
                                orientation={
                                    matches_up_sm ? "vertical" : "horizontal"
                                }
                                buttons={buttons}
                                value={filters}
                                onChange={handleFilterChange}
                                highlightOnHover={false}
                                padding={0}
                                spacing={4}
                            />
                        </Grid>
                    </Grid>
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
