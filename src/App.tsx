import "App.css";

// Component imports
import RootLayout from "components/_RootLayout";

// MUI imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import { getTheme } from "themes/theme";

function App() {
    const theme = getTheme("Dark");

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootLayout />
        </ThemeProvider>
    );
}

export default App;
