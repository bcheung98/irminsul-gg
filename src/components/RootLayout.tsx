import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";

// Component imports
import Nav from "./nav/Nav";
import NavBottom from "./nav/NavBottom";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectBackground } from "reducers/layout";

function RootLayout() {
    const theme = useTheme();

    const location = useLocation().pathname;
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const tag = useAppSelector(selectBackground);

    const backgroundImageColors = [
        `rgba(23, 46, 98, 0.75)`,
        "rgba(73, 218, 243, 0.2)",
    ];

    return (
        <>
            <Box id="back-to-top-anchor" />
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: theme.background(0),
                    backgroundImage: {
                        xs: `linear-gradient(to bottom, ${backgroundImageColors[0]} 10%, ${backgroundImageColors[1]} 50%, ${backgroundImageColors[0]} 100%)`,
                        sm: `url(https://assets.irminsul.gg/main/backgrounds/${tag}.png)`,
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 25%",
                    backgroundAttachment: "fixed",
                    transition: "all 0.1s ease-in-out 0.1s",
                    WebkitTransition: "all 0.1s ease-in-out 0.1s",
                }}
            >
                <Nav />
                <Box
                    sx={{
                        minWidth: "0vw",
                        width: "100vw",
                        backgroundImage: `linear-gradient(to bottom, ${backgroundImageColors[0]} 10%, ${backgroundImageColors[1]} 50%, ${backgroundImageColors[0]} 100%)`,
                    }}
                >
                    <Outlet />
                    <NavBottom />
                </Box>
            </Box>
        </>
    );
}

export default RootLayout;
