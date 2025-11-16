"use client";

// Component imports
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { GenshinWeapon } from "@/types/genshin/weapon";
import { AttributeData } from "@/types";

export default function WeaponPage({ weapon }: { weapon: GenshinWeapon }) {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    return <>{weapon.displayName}</>;
}
