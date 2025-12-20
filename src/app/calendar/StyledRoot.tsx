"use client";

// Component imports
import NavBarBottom from "@/components/NavBar/NavBarBottom";

// MUI imports
import Box from "@mui/material/Box";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box>
            <Box sx={{ width: "100%", minHeight: "95vh" }}>{children}</Box>
            <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <NavBarBottom />
            </Box>
        </Box>
    );
}
