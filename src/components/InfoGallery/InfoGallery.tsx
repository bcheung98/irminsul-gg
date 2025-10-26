// Component imports
import InfoGalleryHeader from "./InfoGalleryHeader";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { InfoGalleryProps } from "./InfoGallery.types";

export default function InfoGallery(props: InfoGalleryProps) {
    return (
        <Stack spacing={2} sx={{ p: 1 }}>
            <InfoGalleryHeader {...props} />
            {props.children}
        </Stack>
    );
}
