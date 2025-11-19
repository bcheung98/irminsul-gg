// Component imports
import Text from "@/components/Text";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";

export default function CalendarFooter() {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                p: 1,
                backgroundColor: alpha(
                    theme.contentBox.backgroundColor.header,
                    0.95
                ),
                borderRadius: { sm: "0 0 8px 8px" },
                border: `1px solid ${theme.border.color.primary}`,
                borderTopWidth: 0,
                borderLeftWidth: { xs: 0, sm: 1 },
                borderRightWidth: { xs: 0, sm: 1 },
            }}
            alignItems="center"
            justifyContent="center"
        >
            <InfoIcon fontSize="small" sx={{ color: theme.text.primary }} />
            <Text variant="body2" sx={{ userSelect: "none" }}>
                The schedule and contents of future updates are subject to
                change without notice
            </Text>
        </Stack>
    );
}
