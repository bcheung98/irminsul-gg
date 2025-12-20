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
                    pt: 5,
                    pb: 1,
                    minWidth: "0vw",
                    width: "100vw",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "100vh",
                    }}
                >
                    {children}
                </Box>
                <Toolbar />
                <NavBarBottom />
            </Box>
            <FilterDrawer />
        </Box>
    );
}
