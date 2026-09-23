"use client";

// Component imports
import WeaponInfo from "@/components/WeaponInfo";
import { InfoPageRoot } from "@/components/PageRoot";
import InfoSplash from "@/components/InfoSplash";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import type { ZZZWeapon } from "@/types/zzz/weapon";
import type { AttributeData } from "@/types";

export default function WeaponPage({ weapon }: { weapon: ZZZWeapon }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...weapon };

    const Splash = (
        <InfoSplash
            src={`zzz/w-engines/${weapon.id}`}
            rarity={weapon.rarity}
            padding="16px"
        />
    );

    const InfoMain = (
        <WeaponInfo
            stats={weapon.stats}
            materials={{}}
            attributes={attributes}
            image={Splash}
        />
    );

    const Header = <BetaTag version={weapon.release.version} />;

    const leftColumn = [];
    if (matches) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain);

    return (
        <InfoPageRoot
            header={Header}
            leftColumn={leftColumn.length > 0 && leftColumn}
            rightColumn={rightColumn.length > 0 && rightColumn}
            columnSizes={["auto", "grow"]}
        />
    );
}
