import { alpha, SxProps, Theme } from "@mui/material/styles";

export const calendarStyles: SxProps<Theme> = (theme) => ({
    pt: { xs: 0, sm: 2, md: 3 },
    color: theme.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.font.weight.primary,
    "--fc-page-bg-color": alpha(theme.contentBox.backgroundColor.header, 0.95),
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
        backgroundColor: alpha(theme.background(1, "dark"), 0.75),
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
            borderRadius: "8px 8px 0px 0px",
        },
        ".fc-scrollgrid": {
            borderLeftWidth: "1px",
            borderRadius: "8px 8px 0px 0px",
        },
        ".fc-scrollgrid-section > td": {
            borderRightWidth: "1px",
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

export const calendarHeaderStyles: SxProps<Theme> = () => ({
    columnGap: 2,
    rowGap: 1,
    alignItems: "center",
    justifyContent: { xs: "space-between", sm: "left" },
    p: { xs: "8px 16px", sm: "0px 24px" },
    flexWrap: "wrap",
});

export const calendarButtonStyles: SxProps<Theme> = (theme) => ({
    p: "0px 8px",
    borderRadius: "4px",
    minWidth: { xs: "28px", sm: "64px" },
    height: { xs: "20px", sm: "28px" },
    "&.Mui-disabled": {
        opacity: 0.5,
        outline: `1px solid ${theme.border.color.secondary}`,
    },
});

export const calendarIconButtonStyles: SxProps<Theme> = (theme) => ({
    p: "4px",
    borderRadius: "4px",
    height: { xs: "20px", sm: "28px" },
    "&:hover": {
        backgroundColor: theme.appbar.backgroundColor.selectedHover,
    },
});

export const calendarMenuButtonStyles: SxProps<Theme> = (theme) => ({
    p: 0.5,
    borderRadius: "4px",
    height: { xs: "20px", sm: "28px" },
    "&:hover": {
        backgroundColor: theme.appbar.backgroundColor.selectedHover,
    },
});
