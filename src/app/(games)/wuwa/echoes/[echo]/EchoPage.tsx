"use client";

// Component imports
import EchoInfo from "@/components/_wuwa/EchoInfo";
import InfoPageRoot from "@/components/InfoPageRoot";
import Image from "@/components/Image";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports

import {
    getWuWaBackgroundColor,
    getWuWaRarityColor,
} from "@/helpers/wuwa/rarityColors";

// Type imports
import { WuWaEcho } from "@/types/wuwa";

export default function EchoPage({ echo }: { echo: WuWaEcho }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let imgURL = `wuwa/echoes/${echo.id}`;

    const Splash = (
        <Image
            src={imgURL}
            style={{
                width: matches ? "100%" : "128px",
                maxWidth: "256px",
                height: "auto",
                backgroundColor: theme.background(2),
                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${echo.rarity}.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                borderRadius: theme.contentBox.border.radius * 4,
                border: `2px solid ${getWuWaRarityColor(echo.rarity)}`,
                boxShadow: `inset 0 0 24px 16px ${getWuWaBackgroundColor(
                    echo.rarity
                )}`,
            }}
        />
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
