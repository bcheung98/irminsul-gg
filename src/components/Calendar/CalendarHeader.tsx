import { useEffect, useState } from "react";

// Component imports
import CalendarDrawer from "./CalendarDrawer";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import {
    calendarButtonStyles,
    calendarIconButtonStyles,
} from "./Calendar.styles";
import { months } from "@/helpers/dates";

// Type imports
import { CalendarApi } from "@fullcalendar/core/index.js";

export default function CalendarHeader({
    calendarApi,
}: {
    calendarApi: () => CalendarApi | undefined;
}) {
    const theme = useTheme();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawerState = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };

    const getDateText = (date?: Date) => {
        if (!date) date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${months[month]} ${year}`;
    };

    const [title, setTitle] = useState("");
    const handleTitleChange = () => {
        setTitle(getDateText(calendarApi()?.getDate()));
    };

    const jumpToday = () => {
        calendarApi()?.today();
        handleTitleChange();
    };

    const prevYear = () => {
        calendarApi()?.prevYear();
        handleTitleChange();
    };

    const nextYear = () => {
        calendarApi()?.nextYear();
        handleTitleChange();
    };

    const prevMonth = () => {
        calendarApi()?.prev();
        handleTitleChange();
    };

    const nextMonth = () => {
        calendarApi()?.next();
        handleTitleChange();
    };

    const isDisabled = getDateText(calendarApi()?.getDate()) === getDateText();

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "ArrowLeft") {
            event.preventDefault();
            prevYear();
            return;
        }
        if (event.ctrlKey && event.key === "ArrowRight") {
            event.preventDefault();
            nextYear();
            return;
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            prevMonth();
            return;
        }
        if (event.key === "t") {
            event.preventDefault();
            jumpToday();
            return;
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextMonth();
            return;
        }
    };

    useEffect(() => {
        handleTitleChange();
        window.addEventListener("keydown", keyDownHandler);
    }, []);

    return (
        <AppBar
            sx={{ top: 48, backgroundColor: theme.drawer.backgroundColor.main }}
        >
            <Toolbar
                variant="dense"
                sx={{
                    display: calendarApi() ? "flex" : "none",
                    columnGap: 2,
                    rowGap: 1,
                    flexWrap: "wrap",
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Tooltip title="Open menu" placement="top">
                        <IconButton
                            onClick={toggleDrawerState(true)}
                            sx={calendarIconButtonStyles}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Text
                        variant="h6"
                        sx={{ minWidth: "192px", userSelect: "none" }}
                    >
                        {title}
                    </Text>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={jumpToday}
                        sx={calendarButtonStyles}
                        disabled={isDisabled}
                    >
                        <Text variant="subtitle2">Today</Text>
                    </Button>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Tooltip title="Previous month" placement="top">
                            <IconButton
                                onClick={prevMonth}
                                sx={calendarIconButtonStyles}
                            >
                                <KeyboardArrowLeftIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Next month" placement="top">
                            <IconButton
                                onClick={nextMonth}
                                sx={calendarIconButtonStyles}
                            >
                                <KeyboardArrowRightIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Toolbar>
            <Drawer open={drawerOpen} onClose={toggleDrawerState(false)}>
                <CalendarDrawer toggleDrawerState={toggleDrawerState} />
            </Drawer>
        </AppBar>
    );
}
