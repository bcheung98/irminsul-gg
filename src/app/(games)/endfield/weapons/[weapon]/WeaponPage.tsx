"use client";

// Component imports
import WeaponInfo from "@/components/WeaponInfo";
import InfoPageRoot from "@/components/InfoPageRoot";
import Image from "@/components/Image";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useGameTag } from "@/context";
import {
    getEndfieldBackgroundColor,
    getEndfieldRarityColor,
} from "@/helpers/endfield/rarityColors";

// Type imports
import { EndfieldWeapon } from "@/types/endfield/weapon";
import { AttributeData } from "@/types";

export default function WeaponPage({ weapon }: { weapon: EndfieldWeapon }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    const attributes: AttributeData = { ...weapon };

    const Splash = (
        <Image
            src={`${game}/weapons/${weapon.id}`}
            style={{
                width: matches ? "100%" : "128px",
                maxWidth: "256px",
                height: "auto",
                backgroundColor: theme.background(2),
                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${weapon.rarity}.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                borderRadius: theme.contentBox.border.radius * 4,
                border: `2px solid ${getEndfieldRarityColor(weapon.rarity)}`,
                boxShadow: `inset 0 0 24px 16px ${getEndfieldBackgroundColor(
                    weapon.rarity,
                )}`,
            }}
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
