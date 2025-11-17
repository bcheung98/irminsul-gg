import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import RarityStars from "@/components/RarityStars";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";
import { getDataIconURL } from "@/helpers/dataIcon";
import { useRarityColors } from "@/helpers/rarityColors";

// Type imports
import { AttributeData, AttributeDataKey } from "@/types";

export default function WeaponAttributes({
    attributes,
    image,
}: {
    attributes: AttributeData;
    image: React.ReactNode;
}) {
    const game = useGameTag();

    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const rarityColors = useRarityColors()[game];

    function Rarity() {
        if (game === "zzz") {
            return <></>;
        } else {
            return (
                <InfoChip
                    title={
                        <RarityStars
                            rarity={attributes.rarity}
                            color={rarityColors(attributes.rarity)}
                            variant="h6"
                        />
                    }
                    chipProps={{ padding: "0px 8px" }}
                />
            );
        }
    }

    function Chip(props: { attrKey: AttributeDataKey }) {
        const key = props.attrKey;
        const value = attributes[key];
        const values = !Array.isArray(value) ? [value] : value;

        return values.map((value) => {
            const { src, tooltip } = getDataIconURL({ game, key, value });
            return (
                <InfoChip key={`${key}-${value}`} icon={src} title={tooltip} />
            );
        });
    }

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ width: "100%" }}>
            <FlexBox spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box sx={{ display: { xs: "block", md: "none" } }}>{image}</Box>
                <Stack spacing={1}>
                    <TextLabel
                        title={attributes.displayName}
                        titleProps={{ variant: matches ? "h4" : "h6" }}
                        textSpacing={0.5}
                    />
                    <FlexBox spacing={1} wrap>
                        {gameAttributes.map(
                            (key) =>
                                attributes[key] &&
                                (key === "rarity" ? (
                                    <Rarity key={key} />
                                ) : (
                                    <Chip key={key} attrKey={key} />
                                ))
                        )}
                    </FlexBox>
                </Stack>
            </FlexBox>
            {attributes.description && (
                <Text variant="body2">{parse(attributes.description)}</Text>
            )}
        </Stack>
    );
}

const gameAttributes: AttributeDataKey[] = ["rarity", "weaponType"];
