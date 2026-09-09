// Component imports
import NavDrawerMenuItem from "./NavDrawerMenuItem";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { NavDrawerProps } from "./NavDrawer";

export default function NavDrawerMenu({
    open,
    onClose,
    items,
}: NavDrawerProps) {
    return (
        <Grid
            container
            className="nav-mobile"
            rowSpacing={1}
            columnSpacing={{ xs: 2, md: 1 }}
            sx={{ px: { xs: 2, md: 0 }, py: { xs: 1, md: 0 } }}
        >
            {(items ?? []).map((item) => (
                <NavDrawerMenuItem
                    key={item.title}
                    open={open}
                    onClose={onClose}
                    item={item}
                />
            ))}
        </Grid>
    );
}
