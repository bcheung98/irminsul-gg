import { Outlet } from "react-router";

// MUI imports
import { Box } from "@mui/material";

function CalendarLayout() {
    return (
        <Box
            sx={{
                mt: { xs: "56px", sm: "64px" },
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <Outlet />
        </Box>
    );
}

export default CalendarLayout;
