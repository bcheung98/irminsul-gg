// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useGameTag } from "@/context";
import { formatHref, splitJoin } from "@/utils";
import { categories, categoryImgURLs } from "@/data/categories";
import { useRarityColors } from "@/helpers/rarityColors";
import { getDataIconURL } from "@/helpers/dataIcon";
import { usePlannerData } from "../Planner/Planner.utils";

// Type imports
import { GameNoUma } from "@/types";
import { InfoChipProps } from "../InfoChip/InfoChip.types";
import { PlannerCardHeaderProps } from "./PlannerCardRoot.types";

export default function PlannerCardHeader(props: PlannerCardHeaderProps) {
    const { type, chipColor, textVariant, href } = props;

    const { characters, weapons } = usePlannerData();

    const dataSet = type === "characters" ? characters : weapons;
    const item = dataSet.find((i) => i.id === props.item.id);

    if (!item) {
        throw new Error(`Could not find item with ID ${props.item.id}`);
    }

    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const rarity =
        game === "hsr" &&
        type === "characters" &&
        item.name.startsWith("Trailblazer")
            ? 5
            : item.rarity;

    const rarityColors = useRarityColors()[game];

    function getURL() {
        return `${splitJoin(
            categories[`${game}/${type}`],
            " ",
            ""
        ).toLowerCase()}/${formatHref(href)}`;
    }

    const { src: elementSrc, tooltip: elementTooltip } = getDataIconURL({
        game,
        key: "element",
        value: item.element,
    });
    const { src: weaponTypeSrc, tooltip: weaponTypeTooltip } = getDataIconURL({
        game,
        key: "weaponType",
        value: item.weaponType,
    });
    const chipParams: InfoChipProps = {
        chipProps: {
            background: chipColor || theme.background(1),
            padding: "0 8px",
            height: "24px",
        },
        iconProps: { size: 16 },
        titleProps: { variant: "body3", sx: { userSelect: "none" } },
    };

    return (
        <TextLabel
            icon={categoryImgURLs[`${game}/${type}`](item.id)}
            iconProps={{
                size: 48,
                styles: {
                    border: `2px solid ${rarityColors(rarity)}`,
                    backgroundColor: theme.background(2),
                    backgroundImage: theme.materialCard.backgroundImage(rarity),
                    backgroundSize: "contain",
                },
            }}
            title={item.displayName}
            titleProps={{ variant: textVariant, sx: { userSelect: "none" } }}
            subtitle={
                <FlexBox spacing={[1, 0.5]} wrap>
                    {item.element && (
                        <InfoChip
                            icon={elementSrc}
                            title={elementTooltip}
                            {...chipParams}
                        />
                    )}
                    <InfoChip
                        icon={weaponTypeSrc}
                        title={weaponTypeTooltip}
                        {...chipParams}
                    />
                </FlexBox>
            }
            spacing={2}
            textSpacing={0.5}
            href={href && getURL()}
        />
    );
}
