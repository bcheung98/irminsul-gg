import { usePathname } from "next/navigation";

// Component imports
import DrawerDesktop from "./FilterDrawerDesktop";
import DrawerMobile from "./FilterDrawerMobile";
import {
    GenshinCharacterFilters,
    GenshinWeaponFilters,
} from "@/components/_genshin/Filters";
import {
    HSRCharacterFilters,
    HSRWeaponFilters,
} from "@/components/_hsr/Filters";
import {
    WuWaCharacterFilters,
    WuWaEchoFilters,
    WuWaWeaponFilters,
} from "@/components/_wuwa/Filters";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useDrawerStore } from "@/stores";

export default function FilterDrawer() {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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
            toggleDrawer={() => toggleRightDrawer()}
            component={component}
        />
    ) : (
        <DrawerMobile
            open={rightDrawerMobileOpen}
            toggleDrawer={() => toggleRightDrawerMobile()}
            component={component}
        />
    );
}

const components: Record<string, React.ReactNode> = {
    "/genshin/characters": <GenshinCharacterFilters />,
    "/genshin/weapons": <GenshinWeaponFilters />,
    "/hsr/characters": <HSRCharacterFilters />,
    "/hsr/lightcones": <HSRWeaponFilters />,
    "/wuwa/resonators": <WuWaCharacterFilters />,
    "/wuwa/weapons": <WuWaWeaponFilters />,
    "/wuwa/echoes": <WuWaEchoFilters />,
};
