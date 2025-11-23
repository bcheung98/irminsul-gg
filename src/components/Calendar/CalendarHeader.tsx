import { useEffect, useState } from "react";

// Component imports
import CalendarDrawer from "./CalendarDrawer";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import MenuCloseIcon from "@/components/MenuCloseIcon";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import {
    calendarButtonStyles,
    calendarHeaderStyles,
    calendarIconButtonStyles,
    calendarMenuButtonStyles,
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
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawerState = (newOpen?: boolean) => {
        if (newOpen !== undefined) setDrawerOpen(newOpen);
        else setDrawerOpen(!drawerOpen);
    };

    const getDateText = (date?: Date) => {
        if (!date) date = new Date();
        const month = `${months[date.getMonth()]}`;
        const year = date.getFullYear();
        return matches ? `${month} ${year}` : `${month.slice(0, 3)} ${year}`;
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
        // TODO: Fix site search input being blocked by this
        // if (event.key === "t") {
        //     event.preventDefault();
        //     jumpToday();
        //     return;
        // }
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

    useEffect(() => {
        handleTitleChange();
    }, [matches]);

    const MenuButton = (
        <Tooltip
            title={!drawerOpen ? "Open menu" : "Close menu"}
            placement="top"
        >
            <IconButton
                onClick={() => toggleDrawerState()}
                sx={calendarMenuButtonStyles}
            >
                <MenuCloseIcon open={drawerOpen} />
            </IconButton>
        </Tooltip>
    );

    const TodayButton = (
        <Button
            variant="contained"
            color="info"
            onClick={jumpToday}
            sx={calendarButtonStyles}
            disabled={isDisabled}
        >
            <Text
                variant="subtitle2"
                sx={{ fontWeight: theme.font.weight.highlight }}
            >
                Today
            </Text>
        </Button>
    );

    const PrevMonthButton = (
        <Tooltip title="Previous month" placement="top">
            <IconButton onClick={prevMonth} sx={calendarIconButtonStyles}>
                <KeyboardArrowLeftIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );

    const NextMonthButton = (
        <Tooltip title="Next month" placement="top">
            <IconButton onClick={nextMonth} sx={calendarIconButtonStyles}>
                <KeyboardArrowRightIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );

    const Title = (
        <Text
            variant={matches ? "h6" : "body1"}
            sx={{
                fontWeight: theme.font.weight.highlight,
                userSelect: "none",
                lineHeight: { xs: "20px", sm: "28px" },
            }}
        >
            {title}
        </Text>
    );

    const PageName = (
        <Text
            variant={matches ? "body1" : "body2"}
            sx={{
                fontWeight: theme.font.weight.highlight,
                userSelect: "none",
                lineHeight: { xs: "20px", sm: "28px" },
            }}
        >
            Gacha Calendar
        </Text>
    );

    const HeaderDesktop = (
        <>
            <FlexBox spacing={3}>
                <FlexBox spacing={2}>
                    {MenuButton}
                    {PageName}
                </FlexBox>
                {TodayButton}
                <FlexBox spacing={0.5}>
                    {PrevMonthButton}
                    {NextMonthButton}
                </FlexBox>
            </FlexBox>
            {Title}
        </>
    );

    const HeaderMobile = (
        <>
            {MenuButton}
            <FlexBox spacing={0.5}>
                {PrevMonthButton}
                {Title}
                {NextMonthButton}
            </FlexBox>
            {TodayButton}
        </>
    );

    const Header = matches ? HeaderDesktop : HeaderMobile;

    return (
        <AppBar
            sx={{
                top: 48,
                backgroundColor: alpha(
                    theme.appbar.backgroundColor.main,
                    matches ? 0.95 : 1
                ),
                borderColor: theme.border.color.secondary,
            }}
            elevation={0}
        >
            <Toolbar variant="dense" disableGutters sx={calendarHeaderStyles}>
                {calendarApi() && Header}
            </Toolbar>
            <Drawer
                open={drawerOpen}
                onClose={() => toggleDrawerState()}
                sx={{ zIndex: theme.zIndex.appBar - 1 }}
            >
                <CalendarDrawer />
            </Drawer>
        </AppBar>
    );
}
