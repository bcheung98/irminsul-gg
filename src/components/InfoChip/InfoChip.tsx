// Component imports
import DataIcon from "../DataIcon/DataIcon";
import Text from "../Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Type imports
import { InfoChipProps } from "./InfoChip.types";
import TextLabel from "../TextLabel";

export default function InfoChip(props: InfoChipProps) {
    const theme = useTheme();

    const { chipProps } = props;

    return (
        <Box
            sx={{
                backgroundColor:
                    chipProps?.background || theme.palette.tertiary.main,
                borderRadius: "16px",
                width: "max-content",
                p: chipProps?.padding ?? "4px 16px",
            }}
        >
            <TextLabel titleProps={{ variant: "body2" }} {...props} />
        </Box>
    );
}
