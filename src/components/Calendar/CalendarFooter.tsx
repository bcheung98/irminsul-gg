// Component imports
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";

export default function CalendarFooter() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, px: { xs: 1, sm: 0 } }}
            alignItems="center"
        >
            <InfoIcon
                fontSize={matches ? "medium" : "small"}
                sx={{ color: theme.text.primary }}
            />
            <Text variant="subtitle1">
                Please note that the dates of all future updates are subject to
                change
            </Text>
        </Stack>
    );
}
