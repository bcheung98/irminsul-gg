"use client";

// Component imports
import NavBarMini from "@/components/NavBarMini";
import NavBarBottom from "@/components/NavBar/NavBarBottom";
import FilterDrawer from "@/components/FilterDrawer";

// MUI imports
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box sx={{ display: "flex" }}>
            <NavBarMini />
            <Box
                sx={{
                    px: { xs: 1, md: 2 },
                    py: 5,
                    pb: 8,
                    minWidth: "0vw",
                    width: "100vw",
                    minHeight: "100vh",
                }}
            >
                {children}
                <Toolbar variant="dense" />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        px: 1,
                    }}
                >
                    <NavBarBottom />
                </Box>
            </Box>
            <FilterDrawer />
        </Box>
    );
}
