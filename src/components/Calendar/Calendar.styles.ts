import { alpha, SxProps, Theme } from "@mui/material/styles";

export const calendarStyles: SxProps<Theme> = (theme) => ({
    pt: 2,
    color: theme.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.font.weight.primary,
    "--fc-page-bg-color": theme.contentBox.backgroundColor.header,
    "--fc-border-color": theme.border.color.primary,
    "--fc-event-bg-color": "transparent",
    "--fc-event-border-color": "transparent",
    "--fc-event-selected-overlay-color": "transparent",
    "--fc-today-bg-color": alpha(theme.palette.info.main, 0.5),
    ".fc-toolbar-chunk": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
    },
    ".fc-header-toolbar.fc-toolbar": {
        mb: "16px",
    },
    ".fc-toolbar-title, .fc-button": {
        fontWeight: theme.font.weight.primary,
    },
    ".fc-daygrid": {
        backgroundColor: alpha(theme.background(1), 0.75),
        backdropFilter: "blur(4px)",
    },
    ".fc-col-header-cell": {
        p: "4px",
        userSelect: "none",
    },
    ".fc .fc-daygrid-day-top": {
        p: "4px",
        display: "block",
        textAlign: "center",
    },
    ".fc .fc-daygrid-day-frame": {
        userSelect: "none",
    },
    ".fc-daygrid-day-events": {
        display: "flex",
        flexDirection: "column",
        rowGap: "4px",
    },
    [theme.containerQueries.up("xs")]: {
        ".fc-header-toolbar": {
            px: "8px",
        },
        ".fc-toolbar-title": {
            fontSize: theme.font.sizes.body1.xs,
            userSelect: "none",
        },
        ".fc-scrollgrid": {
            borderLeftWidth: "0px",
        },
        ".fc-scrollgrid-section > td": {
            borderRightWidth: "0px",
        },
        ".fc-scrollgrid-section > th": {
            borderRightWidth: "0px",
        },
        ".fc-event-title-container": {
            fontSize: theme.font.sizes.subtitle2.xs,
        },
        ".fc-col-header-cell-cushion": {
            fontSize: theme.font.sizes.body2.xs,
            fontWeight: theme.font.weight.primary,
        },
        ".fc .fc-daygrid-day-frame": {
            minHeight: "96px",
        },
    },
    [theme.containerQueries.up("sm")]: {
        ".fc-header-toolbar": {
            px: "4px",
        },
        ".fc-toolbar-title": {
            fontSize: theme.font.sizes.h6.sm,
        },
        ".fc-daygrid": {
            borderRadius: "8px",
        },
        ".fc-scrollgrid": {
            borderLeftWidth: "1px",
            borderRadius: "8px",
        },
        ".fc-scrollgrid-section > td": {
            borderRightWidth: "1px",
            borderRadius: "0px 0px 8px 8px",
        },
        ".fc-scrollgrid-section > th": {
            borderRightWidth: "1px",
            borderRadius: "8px 8px 0px 0px",
        },
        ".fc-event-title-container": {
            fontSize: theme.font.sizes.subtitle2.sm,
            px: "4px",
        },
        ".fc-col-header-cell-cushion": {
            fontSize: theme.font.sizes.body2.sm,
        },
        ".fc .fc-daygrid-day-frame": {
            minHeight: "120px",
        },
    },
});

export const calendarButtonStyles: SxProps<Theme> = (theme) => ({
    p: "0px 8px",
    borderRadius: "4px",
    height: "28px",
    "&.Mui-disabled": {
        opacity: 0.5,
    },
});

export const calendarIconButtonStyles: SxProps<Theme> = (theme) => ({
    p: "4px",
    borderRadius: "4px",
    height: "28px",
    "&:hover": {
        backgroundColor: theme.drawer.backgroundColor.hover,
    },
});
