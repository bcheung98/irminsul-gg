// Component imports
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

export default function NavBar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return matches ? <NavBarDesktop /> : <NavBarMobile />;
}
