import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import rrulePlugin from "@fullcalendar/rrule";

// Component imports
import Image from "custom/Image";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Container, Paper, Toolbar, Box } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectBanners } from "reducers/banner";
import { fetchBanners } from "rtk/fetchData";

// Type imports
import { EventSourceObject, Website } from "types/common";
import { createEventSourceObject } from "helpers/createEventSourceObject";

function Calendar({ websites }: { websites: Website[] }) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const buttons = [] as CustomToggleButtonProps[];
    websites.forEach((website) => {
        if (website.enabled) {
            buttons.push({
                value: website.tag.toLowerCase(),
                icon: (
                    <Image
                        src={`game-icons/${website.tag}`}
                        alt={website.tag}
                        style={{
                            width: "40px",
                            borderRadius: "4px",
                            padding: "0px",
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
        () => filterGames(createEventSourceObject(banners), filters),
        [banners, filters]
    );

    return (
        <Container maxWidth="xl" disableGutters>
            <Paper
                sx={{
                    backgroundColor: theme.background(2),
                    p: 3,
                    borderRadius: "16px",
                    color: theme.text.primary,
                    fontFamily: theme.font.styled.family,
                    fontWeight: theme.font.styled.weight,
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        flexGrow: 1,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", sm: "space-between" },
                        rowGap: "8px",
                        mb: "16px",
                    }}
                >
                    <TextStyled variant="h4-styled" gutterBottom>
                        Gacha Calendar
                    </TextStyled>
                    <Box>
                        <TextStyled gutterBottom sx={{ textAlign: "center" }}>
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
                <FullCalendar
                    plugins={[dayGridPlugin, rrulePlugin]}
                    initialView="dayGridMonth"
                    contentHeight="70vh"
                    buttonText={{ today: "Today" }}
                    eventSources={eventSources}
                    eventOrder="tag"
                    eventOrderStrict={true}
                    eventDisplay="block"
                    displayEventTime={false}
                />
            </Paper>
        </Container>
    );
}

export default Calendar;

function filterGames(events: EventSourceObject[], filters: string[]) {
    return events.filter((event) => filters.includes(event.tag.split("/")[0]));
}
