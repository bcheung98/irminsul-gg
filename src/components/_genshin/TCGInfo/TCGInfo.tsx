// Component imports
import ContentBox from "@/components/ContentBox";
import TCGAttributes from "../TCGAttributes";
import TCGCharacterCardSkills from "../TCGCharacterCardSkills";
import TCGActionCardDescription from "../TCGActionCardDescription";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { GenshinTCGCard } from "@/types/genshin/tcg";
import { AttributeData } from "@/types";

export default function TCGInfo({
    card,
    image,
}: {
    card: GenshinTCGCard;
    image: React.ReactNode;
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const attributes: AttributeData = {
        id: card.id,
        name: card.name,
        displayName: card.displayName,
        element: "hp" in card ? card.tags[0] : undefined,
        weaponType: "hp" in card ? card.tags[1] : undefined,
    };

    return (
        <ContentBox
            header={
                <TCGAttributes
                    name={card.displayName}
                    description={card.splash.description}
                    tags={card.tags}
                    image={image}
                />
            }
            headerProps={{ padding: matches ? "16px 24px" : "16px" }}
            contentProps={{ padding: matches ? "16px 24px" : "16px 8px" }}
        >
            {"skills" in card ? (
                <TCGCharacterCardSkills
                    skills={card.skills}
                    attributes={attributes}
                />
            ) : (
                <TCGActionCardDescription
                    description={card.description}
                    attributes={attributes}
                />
            )}
        </ContentBox>
    );
}
