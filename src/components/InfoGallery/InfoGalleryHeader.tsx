// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";
import SearchBar from "@/components/SearchBar";

// MUI imports
import Grid from "@mui/material/Grid";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Type imports
import { InfoGalleryButtonProps, InfoGalleryProps } from "./InfoGallery.types";

export default function InfoGalleryHeader({
    title,
    buttons = defaultButtons,
    view,
    handleView,
    searchValue,
    handleInputChange,
}: InfoGalleryProps) {
    return (
        <Grid container spacing={2}>
            <Grid size="auto">
                <Text variant="h5">{title}</Text>
            </Grid>
            <Grid size={{ xs: 6, sm: "auto" }}>
                <ToggleButtons
                    color="primary"
                    buttons={buttons}
                    value={view}
                    exclusive
                    onChange={handleView}
                    highlightOnHover={false}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: "auto" }}>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    sx={{ height: "32px" }}
                />
            </Grid>
        </Grid>
    );
}

export const defaultButtons: InfoGalleryButtonProps[] = [
    {
        value: "icon",
        icon: <ViewCompactIcon />,
        tooltip: "Card view",
    },
    {
        value: "card",
        icon: <ViewModuleIcon />,
        tooltip: "Expanded card view",
    },
    {
        value: "table",
        icon: <TableRowsIcon />,
        tooltip: "List view",
    },
];
