import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import "App.css";

// Component imports
import RouteConfig from "components/nav/RouteConfig";

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

    console.log(
        `MKCLXYKCM\nOZBLLCZAN\nBFIKCLELC\nCDMNXLQZZ\nGILFCQOGI\nWXTDQWLBL\nSZIBIWIVC\nFWLLGCWAL\n`
    );

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouteConfig />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
