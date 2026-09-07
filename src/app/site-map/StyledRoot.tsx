"use client";

// Component imports
import NavBarBottom from "@/components/NavBar/NavBarBottom";

// MUI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box>
            <Box sx={{ width: "100%", minHeight: "100vh" }}>{children}</Box>
            <Container maxWidth="xl" sx={{ pt: 12 }}>
                <NavBarBottom />
            </Container>
        </Box>
    );
}
