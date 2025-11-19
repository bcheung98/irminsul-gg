// MUI imports
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function CalendarDrawer({
    toggleDrawerState,
}: {
    toggleDrawerState: (newOpen: boolean) => () => void;
}) {
    const theme = useTheme();

    return (
        <>
            <Toolbar variant="dense" />
            <Box
                sx={{
                    width: "350px",
                    px: 2,
                    py: 1,
                }}
            >
                <IconButton
                    onClick={toggleDrawerState(false)}
                    sx={{
                        p: 0.5,
                        color: theme.text.primary,
                        "&:hover": {
                            backgroundColor: theme.drawer.backgroundColor.hover,
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </>
    );
}
