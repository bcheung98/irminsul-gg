import { usePathname } from "next/navigation";

// Component imports
import DrawerDesktop from "./InfoGalleryDrawerDesktop";
import DrawerMobile from "./InfoGalleryDrawerMobile";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useDrawerStore } from "@/stores/useDrawerStore";

export default function InfoGalleryDrawer() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const pathname = usePathname();

    const {
        rightDrawerOpen,
        toggleRightDrawer,
        rightDrawerMobileOpen,
        toggleRightDrawerMobile,
    } = useDrawerStore();

    const component = components[pathname];

    return matches ? (
        <DrawerDesktop
            open={rightDrawerOpen}
            toggleDrawer={toggleRightDrawer}
            component={component}
        />
    ) : (
        <DrawerMobile
            open={rightDrawerMobileOpen}
            toggleDrawer={toggleRightDrawerMobile}
            component={component}
        />
    );
}

const components: Record<string, React.ReactNode> = {
    "/genshin/characters": <></>,
    "/genshin/weapons": <></>,
};
