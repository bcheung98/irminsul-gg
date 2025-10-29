// Component imports
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Type imports
import { InfoChipProps } from "./InfoChip.types";

export default function InfoChip(props: InfoChipProps) {
    const theme = useTheme();

    const { chipProps } = props;

    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor:
                    chipProps?.background || theme.palette.tertiary.main,
                borderRadius: "16px",
                width: "max-content",
                p: chipProps?.padding ?? "0px 16px",
                minHeight: { xs: "24px", md: "32px" },
                alignItems: "center",
            }}
        >
            <TextLabel titleProps={{ variant: "subtitle2" }} {...props} />
        </Box>
    );
}
