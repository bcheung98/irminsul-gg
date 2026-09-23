"use client";

// Component imports
import EchoInfo from "@/components/_wuwa/EchoInfo";
import { InfoPageRoot } from "@/components/PageRoot";
import InfoSplash from "@/components/InfoSplash";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import type { WuWaEcho } from "@/types/wuwa";

export default function EchoPage({ echo }: { echo: WuWaEcho }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const Splash = (
        <InfoSplash src={`wuwa/echoes/${echo.id}`} rarity={echo.rarity} />
    );

    const InfoMain = <EchoInfo echo={echo} image={Splash} />;

    const header = <BetaTag version={echo.release.version} />;

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
