"use client";

// Component imports
import GearInfo from "@/components/_endfield/GearInfo";
import { InfoPageRoot } from "@/components/PageRoot";
import Image from "@/components/Image";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import {
    getEndfieldBackgroundColor,
    getEndfieldRarityColor,
} from "@/helpers/endfield/rarityColors";

// Type imports
import { EndfieldGear } from "@/types/endfield";

export default function EquipmentPage({ gear }: { gear: EndfieldGear }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const Splash = (
        <Image
            src={`endfield/gear/${gear.stringId}`}
            size={192}
            style={{
                width: matches ? "100%" : "128px",
                maxWidth: "256px",
                height: "auto",
                backgroundColor: theme.background(2),
                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${gear.rarity}.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                borderRadius: theme.contentBox.border.radius * 4,
                border: `2px solid ${getEndfieldRarityColor(gear.rarity)}`,
                boxShadow: `inset 0 0 24px 16px ${getEndfieldBackgroundColor(
                    gear.rarity,
                )}`,
            }}
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
