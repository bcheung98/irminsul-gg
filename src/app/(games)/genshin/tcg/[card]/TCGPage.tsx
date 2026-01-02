"use client";

// Component imports
import InfoPageRoot from "@/components/InfoPageRoot";
import TCGCardImage from "@/components/_genshin/TCGCardImage";
import TCGInfo from "@/components/_genshin/TCGInfo";
import TCGRelatedEntry from "@/components/_genshin/TCGRelatedEntry";
import BetaTag from "@/components/BetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

// Helper imports
import { TCGKeywordContext } from "@/context";
import { tcgKeywords } from "@/data/genshin/tcgKeywords";

// Type imports
import { GenshinTCGCard } from "@/types/genshin/tcg";
import { SkillKeyword } from "@/types/skill";

export default function TCGPage({
    card,
    keywords,
}: {
    card: GenshinTCGCard;
    keywords: SkillKeyword[];
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const Splash = (
        <TCGCardImage
            id={card.id}
            hp={"hp" in card ? card.hp : undefined}
            cost={card.id >= 100000 ? card.cost : undefined}
            size={matches ? 225 : 96}
            style={{
                width: matches ? "225px" : "96px",
                height: matches ? "100%" : "auto",
            }}
        />
    );

    const InfoMain = <TCGInfo card={card} image={Splash} />;

    const Talent =
        "talent" in card ? <TCGRelatedEntry id={card.talent} /> : null;

    const header = <BetaTag version={card.release.version} />;

    const leftColumn = [];
    if (matches) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain, Talent);

    return (
        <TCGKeywordContext value={[...tcgKeywords, ...keywords]}>
            <Box sx={{ pl: { xs: 0, md: 1 } }}>
                <InfoPageRoot
                    header={header}
                    leftColumn={leftColumn.length > 0 && leftColumn}
                    rightColumn={rightColumn.length > 0 && rightColumn}
                    columnSizes={["auto", "grow"]}
                />
            </Box>
        </TCGKeywordContext>
    );
}
