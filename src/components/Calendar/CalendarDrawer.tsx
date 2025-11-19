import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function CalendarDrawer() {
    const theme = useTheme();

    return (
        <>
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            <Box
                sx={{
                    width: "350px",
                    p: 2,
                }}
            >
                <Text>Calendar Settings</Text>
            </Box>
        </>
    );
}
