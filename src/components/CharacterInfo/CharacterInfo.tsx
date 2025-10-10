import { usePathname } from "next/navigation";
import parse from "html-react-parser";

// Component imports
import ContentBox from "../ContentBox/ContentBox";
import TextLabel from "../TextLabel";
import InfoChip from "../InfoChip/InfoChip";
import FlexBox from "../FlexBox";
import RarityStars from "../RarityStars/RarityStars";
import Text from "../Text";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
import { InfoBadgeData } from "../InfoBadge/InfoBadge.types";

interface CharacterInfoProps {
    name: string;
    title: string;
    icon?: string;
    description?: string;
    data?: InfoBadgeData;
}

function InfoMain({
    name,
    title,
    icon,
    description,
    data,
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
                        tooltip: data?.element,
                    }}
                />
                <FlexBox spacing={1} wrap>
                    <InfoChip
                        title={
                            <RarityStars rarity={data?.rarity} variant="h6" />
                        }
                        chipProps={{ padding: "0px 8px" }}
                    />
                    <InfoChip
                        icon={getDataIconURL(game, "weapon", data?.weapon).src}
                        title={data?.weapon}
                    />
                </FlexBox>
            </Stack>
            {description && (
                <Text variant="body2">
                    <i>{parse(description)}</i>
                </Text>
            )}
        </Stack>
    );
}

export default function CharacterInfo(props: CharacterInfoProps) {
    return (
        <ContentBox
            header={<InfoMain {...props} />}
            headerProps={{ padding: "16px 24px" }}
        ></ContentBox>
    );
}
