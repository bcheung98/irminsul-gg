import { Outlet } from "react-router";

// MUI imports
import { Box } from "@mui/material";

function Layout() {
    return (
        <Box
            sx={{
                px: "24px",
                pt: { xs: "48px", sm: "96px" },
                pb: "96px",
                mt: "64px",
                minHeight: "100vh",
                width: {
                    xs: "100%",
                    lg: "75%",
                },
                mx: "auto",
            }}
        >
            <Outlet />
        </Box>
    );
}

export default Layout;
