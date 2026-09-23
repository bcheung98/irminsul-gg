"use client";

// Component imports
import WeaponInfo from "@/components/WeaponInfo";
import { InfoPageRoot } from "@/components/PageRoot";
import InfoSplash from "@/components/InfoSplash";
import BetaTag from "@/components/BetaTag";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import type { HSRWeapon } from "@/types/hsr/weapon";
import type { AttributeData } from "@/types";

export default function WeaponPage({ weapon }: { weapon: HSRWeapon }) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const game = useGameTag();

    const attributes: AttributeData = { ...weapon };

    const imageUrl = matches
        ? `${game}/lightcones/${weapon.id}_card`
        : `${game}/lightcones/${weapon.id}_icon`;

    const Splash = (
        <InfoSplash
            src={imageUrl}
            rarity={weapon.rarity}
            hideBorder={matches}
        />
    );

    const InfoMain = (
        <WeaponInfo
            stats={weapon.stats}
            materials={weapon.materials}
            attributes={attributes}
            image={Splash}
        />
    );

    const header = <BetaTag version={weapon.release.version} />;

    const leftColumn = [];
    if (matches) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain);

    return (
        <InfoPageRoot
            header={header}
            leftColumn={leftColumn.length > 0 && leftColumn}
            rightColumn={rightColumn.length > 0 && rightColumn}
            columnSizes={["auto", "grow"]}
        />
    );
}
