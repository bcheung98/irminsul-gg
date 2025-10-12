import { usePathname } from "next/navigation";
import parse from "html-react-parser";

// Component imports
import ContentBox from "../ContentBox";
import StatsDisplay from "../StatsDisplay/StatsDisplay";
import TextLabel from "../TextLabel";
import InfoChip from "../InfoChip";
import FlexBox from "../FlexBox";
import RarityStars from "../RarityStars";
import Text from "../Text";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
import { AttributeData } from "@/types/_common";
import { TCharacterStats } from "../StatsDisplay/StatsDisplay.types";

interface CharacterInfoProps {
    name: string;
    title: string;
    icon?: string;
    description?: string;
    stats: TCharacterStats;
    attributes: AttributeData;
}

function InfoMain({
    name,
    title,
    icon,
    description,
    attributes,
}: CharacterInfoProps) {
    const game = usePathname().split("/")[1];

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ width: "100%" }}>
            <Stack spacing={1}>
                <TextLabel
                    title={name}
                    subtitle={<i>{title}</i>}
                    titleProps={{ variant: "h4" }}
                    subtitleProps={{ variant: "body1" }}
                    spacing={2}
                    textSpacing={0.5}
                    icon={icon}
                    iconProps={{
                        size: 64,
                        padding: 4,
                        tooltip: attributes?.element,
                    }}
                />
                <FlexBox spacing={1} wrap>
                    <InfoChip
                        title={
                            <RarityStars
                                rarity={attributes?.rarity}
                                variant="h6"
                            />
                        }
                        chipProps={{ padding: "0px 8px" }}
                    />
                    <InfoChip
                        icon={
                            getDataIconURL(game, "weapon", attributes?.weapon)
                                .src
                        }
                        title={attributes?.weapon}
                    />
                </FlexBox>
            </Stack>
            {description && (
                <Text variant="subtitle2">{parse(description)}</Text>
            )}
        </Stack>
    );
}

export default function CharacterInfo(props: CharacterInfoProps) {
    const game = usePathname().split("/")[1];

    return (
        <ContentBox
            header={<InfoMain {...props} />}
            headerProps={{ padding: "16px 24px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <StatsDisplay
                game={game}
                stats={props.stats}
                attributes={props.attributes}
            />
        </ContentBox>
    );
}
