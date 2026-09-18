import { memo, useState } from "react";

// Component imports
import SettingsItem from "@/components/Settings/SettingsItem";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Box from "@mui/material/Box";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Helper imports
import { useCalendarStore } from "@/stores";

// Type imports
import type { CalendarView } from "@/types/calendar";
import type { CalendarApi } from "@fullcalendar/core/index.js";

const buttons = [
    {
        value: "dayGridMonth",
        icon: <ViewModuleIcon fontSize="small" />,
        tooltip: "Grid",
    },
    {
        value: "listMonth",
        icon: <TableRowsIcon fontSize="small" />,
        tooltip: "Rows",
    },
];

const CalendarSettingsViewSelect = memo(function ({
    calendarApi,
}: {
    calendarApi: () => CalendarApi | undefined;
}) {
    const view = useCalendarStore((state) => state.view);
    const setCalendarView = useCalendarStore((state) => state.setCalendarView);

    const [currentView, setCurrentView] = useState(view);

    const handleChange = (
        _: React.BaseSyntheticEvent,
        newValue: CalendarView | null,
    ) => {
        if (newValue) {
            setCurrentView(newValue);
            setCalendarView(newValue);
            calendarApi()?.changeView(newValue);
        }
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 1 } }}>
            <SettingsItem
                label="View"
                alignItems="center"
                textVariant="subtitle1"
                input={
                    <ToggleButtons
                        buttons={buttons}
                        value={currentView}
                        exclusive
                        onChange={handleChange}
                        padding="4px"
                    />
                }
            />
        </Box>
    );
});

export default CalendarSettingsViewSelect;
