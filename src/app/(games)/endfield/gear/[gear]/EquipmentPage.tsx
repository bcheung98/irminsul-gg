"use client";

// Component imports
import GearInfo from "@/components/_endfield/GearInfo";
import { InfoPageRoot } from "@/components/PageRoot";
import InfoSplash from "@/components/InfoSplash";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import type { EndfieldGear } from "@/types/endfield";

export default function EquipmentPage({ gear }: { gear: EndfieldGear }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const Splash = (
        <InfoSplash
            src={`endfield/gear/${gear.stringId}`}
            rarity={gear.rarity}
        />
    );

    const InfoMain = <GearInfo gear={gear} image={Splash} />;

    const header = <BetaTag version={gear.release.version} />;

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
