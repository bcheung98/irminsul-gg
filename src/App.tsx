import { useEffect } from "react";
import "App.css";

// Component imports
import RootLayout from "components/_RootLayout";

// MUI imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import { fetchWebsites } from "rtk/fetchData";
import { useAppDispatch } from "helpers/hooks";
import { getTheme } from "themes/theme";

function App() {
    const theme = getTheme("Dark");

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWebsites());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootLayout />
        </ThemeProvider>
    );
}

export default App;
