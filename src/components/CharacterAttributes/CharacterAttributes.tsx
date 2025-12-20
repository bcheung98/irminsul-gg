import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import RarityStars from "@/components/RarityStars";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import CharacterCombatRoles from "@/components/_wuwa/CharacterCombatRoles";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";
import { useGameTag } from "@/context";
import { rarityMap } from "@/data/zzz/common";

// Type imports
import { AttributeData, AttributeDataKey, GameData } from "@/types";

export default function CharacterAttributes(props: AttributeData) {
    const game = useGameTag();

    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const { ...attributes } = props;

    function Rarity() {
        if (game === "zzz") {
            return <></>;
        } else {
            return (
                <InfoChip
                    title={
                        <RarityStars
                            rarity={attributes.rarity}
                            variant="h6"
                            useRarityColor
                        />
                    }
                    chipProps={{ padding: "0px 8px" }}
                />
            );
        }
    }

    function Chip(props: { attrKey: AttributeDataKey }) {
        const key = props.attrKey;
        let value = attributes[key];
        if (game === "zzz" && key === "element" && attributes.subElement) {
            value = attributes.subElement;
        }
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
            <Stack spacing={1}>
                <TextLabel
                    icon={
                        game === "zzz" &&
                        `zzz/ranks/agent/${rarityMap[attributes.rarity || 3]}`
                    }
                    iconProps={{ size: [48, 0] }}
                    title={attributes.displayName}
                    subtitle={
                        <Text weight="highlight">
                            <i>{attributes.title}</i>
                        </Text>
                    }
                    titleProps={{ variant: matches ? "h4" : "h6" }}
                    textSpacing={0.5}
                    spacing={2}
                />
                <FlexBox spacing={1} wrap>
                    {gameAttributes[game].map(
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
            {game === "wuwa" && <CharacterCombatRoles {...attributes} />}
            {attributes.description && (
                <Box
                    sx={{
                        maxHeight: "128px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                    }}
                >
                    <Text variant="body2">{parse(attributes.description)}</Text>
                </Box>
            )}
        </Stack>
    );
}

const gameAttributes: GameData<AttributeDataKey[]> = {
    genshin: ["rarity", "element", "weaponType", "arkhe"],
    hsr: ["rarity", "element", "weaponType"],
    wuwa: ["rarity", "element", "weaponType"],
    zzz: ["rarity", "element", "weaponType", "attackType"],
    uma: [],
};
