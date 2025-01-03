// Component imports
import Home from "./home/_Home";
import Nav from "./nav/Nav";
import NavBottom from "./nav/NavBottom";

// MUI imports
import { useTheme, Box } from "@mui/material";

function RootLayout() {
    const theme = useTheme();

    const backgroundImageColors = [
        "rgb(23, 46, 98)",
        "rgba(73, 218, 243, 0.2)",
    ];

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: theme.background(0),
                backgroundImage: `linear-gradient(to bottom, ${backgroundImageColors[0]} 5%, ${backgroundImageColors[1]} 50%, ${backgroundImageColors[0]} 100%), url(https://assets.irminsul.gg/main/images/Irminsul.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "50% 25%",
                backgroundAttachment: "fixed",
            }}
        >
            <Nav />
            <Box sx={{ minWidth: "0vw", width: "100vw" }}>
                <Box
                    sx={{
                        px: "24px",
                        pt: "16px",
                        pb: "64px",
                        mt: "64px",
                        minHeight: "100vh",
                    }}
                >
                    <Home />
                </Box>
                <NavBottom />
            </Box>
        </Box>
    );
}

export default RootLayout;
