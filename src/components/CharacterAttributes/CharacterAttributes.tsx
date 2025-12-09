import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import RarityStars from "@/components/RarityStars";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import CharacterCombatRoles from "@/components/_wuwa/CharacterCombatRoles";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";
import { useGameTag } from "@/context";

// Type imports
import { AttributeData, AttributeDataKey, GameData } from "@/types";

export default function CharacterAttributes(props: AttributeData) {
    const game = useGameTag();

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
            <Stack spacing={1}>
                <TextLabel
                    title={attributes.displayName}
                    subtitle={
                        <Text weight="highlight">
                            <i>{attributes.title}</i>
                        </Text>
                    }
                    titleProps={{ variant: "h4" }}
                    textSpacing={0.5}
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
                <Text variant="body2">{parse(attributes.description)}</Text>
            )}
        </Stack>
    );
}

const gameAttributes: GameData<AttributeDataKey[]> = {
    genshin: ["rarity", "element", "weaponType", "arkhe"],
    hsr: ["rarity", "element", "weaponType"],
    wuwa: ["rarity", "element", "weaponType"],
    zzz: [],
    uma: [],
};
