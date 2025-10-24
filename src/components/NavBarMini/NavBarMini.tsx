// Component imports
import NavBarMiniDesktop from "./NavBarMiniDesktop";
import NavBarMiniMobile from "./NavBarMiniMobile";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBarMini() {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    return matches ? <NavBarMiniDesktop /> : <NavBarMiniMobile />;
}
