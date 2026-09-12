"use client";

// Component imports
import NavBarBottom from "@/components/NavBar/NavBarBottom";
import NavBarMini from "@/components/NavBarMini";

// MUI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function PagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box>
            <Box sx={{ display: { xs: "flex", lg: "none" } }}>
                <NavBarMini />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    pt: { xs: 9, md: 0 },
                }}
            >
                {children}
            </Box>
            <Container maxWidth="xl" sx={{ pt: 12 }}>
                <NavBarBottom />
            </Container>
        </Box>
    );
}
