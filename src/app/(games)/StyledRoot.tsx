"use client";

// MUI imports
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toolbar variant="dense" />
            <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>{children}</Box>
        </>
    );
}
