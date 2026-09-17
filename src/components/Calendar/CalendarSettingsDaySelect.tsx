import { memo, useState } from "react";

// Component imports
import SettingsItem from "@/components/Settings/SettingsItem";
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Helper imports
import { useCalendarStore } from "@/stores";
import { days } from "@/helpers/dates";

const CalendarSettingsDaySelect = memo(function () {
    const firstDay = useCalendarStore((state) => state.firstDay);
    const setCalendarStartDay = useCalendarStore(
        (state) => state.setCalendarStartDay,
    );

    const [selectedDay, setSelectedDay] = useState(firstDay);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedDay(Number(event.target.value));
        setCalendarStartDay(Number(event.target.value));
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 1 } }}>
            <SettingsItem
                label="Start week on"
                alignItems="center"
                textVariant="subtitle1"
                input={
                    <Select
                        value={selectedDay.toString()}
                        onChange={handleChange}
                        input={
                            <SelectInput
                                sx={{
                                    "& .MuiInputBase-input": {
                                        padding: "4px 8px 0px 16px",
                                    },
                                }}
                            />
                        }
                    >
                        {days.map((day, index) => (
                            <MenuItem key={day} value={index}>
                                <Text variant="body2">{day}</Text>
                            </MenuItem>
                        ))}
                    </Select>
                }
            />
        </Box>
    );
});

export default CalendarSettingsDaySelect;
