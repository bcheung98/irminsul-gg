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
import type { GenshinWeapon } from "@/types/genshin/weapon";
import type { AttributeData } from "@/types";

export default function WeaponPage({ weapon }: { weapon: GenshinWeapon }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const attributes: AttributeData = { ...weapon };

    let imgURL = `genshin/weapons/${weapon.id}`;
    if (matches) imgURL += "_large";

    const Splash = <InfoSplash src={imgURL} rarity={weapon.rarity} />;

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
