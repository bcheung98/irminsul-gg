// Component imports
import NavDrawerMenuItem from "./NavDrawerMenuItem";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { NavItem } from "@/data/navItems";

export default function NavDrawerMenu({
    open,
    items,
}: {
    open?: boolean;
    items: NavItem[];
}) {
    return (
        <Grid
            container
            className="nav-mobile"
            spacing={1}
            sx={{ px: { xs: 0, sm: 1, lg: 0 }, py: { xs: 1, lg: 0 } }}
        >
            {items.map((item) => (
                <NavDrawerMenuItem key={item.title} open={open} item={item} />
            ))}
        </Grid>
    );
}
