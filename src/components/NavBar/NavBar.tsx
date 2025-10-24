// Component imports
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    return matches ? <NavBarDesktop /> : <NavBarMobile />;
}
