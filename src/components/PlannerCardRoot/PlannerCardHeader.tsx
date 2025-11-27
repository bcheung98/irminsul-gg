// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useGameTag } from "@/context";
import { formatHref } from "@/utils";
import { categoryImgURLs } from "@/data/categories";
import { useRarityColors } from "@/helpers/rarityColors";
import { getDataIconURL } from "@/helpers/dataIcon";
import { usePlannerData } from "../Planner/Planner.utils";

// Type imports
import { Game } from "@/types";
import { InfoChipProps } from "../InfoChip/InfoChip.types";
import { PlannerCardHeaderProps } from "./PlannerCardRoot.types";

export default function PlannerCardHeader(props: PlannerCardHeaderProps) {
    const { type, chipColor, textVariant, href } = props;

    const { characters, weapons } = usePlannerData();

    const dataSet = type === "characters" ? characters : weapons;
    const item = dataSet.find((i) => i.id === props.item.id);

    if (!item) {
        throw new Error(`Could not find item with ID ${props.item.id}`);
        return <></>;
    }

    const theme = useTheme();

    const game = useGameTag() as Exclude<Game, "uma">;

    const rarityColors = useRarityColors()[game];

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
        titleProps: { variant: "body3" },
    };

    return (
        <TextLabel
            icon={categoryImgURLs[`${game}/${type}`](item.name)}
            iconProps={{
                size: 48,
                styles: {
                    border: `2px solid ${rarityColors(item.rarity)}`,
                    backgroundColor: theme.background(2),
                    backgroundImage: theme.materialCard.backgroundImage(
                        item.rarity
                    ),
                    backgroundSize: "contain",
                },
            }}
            title={item.displayName}
            titleProps={{ variant: textVariant }}
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
            href={href && `${type}/${formatHref(href)}`}
        />
    );
}
