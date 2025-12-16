// Component imports
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import InfoChip from "@/components/InfoChip";
import UmaAttributes from "../UmaAttributes";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Type imports
import { SupportPerks } from "@/types/uma/support";
import { AttributeData } from "@/types";

interface SupportInfoProps {
    perks: SupportPerks;
    attributes: AttributeData;
    image: React.ReactNode;
}

export default function SupportInfo({
    perks,
    attributes,
    image,
}: SupportInfoProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const uniqueEffects = perks.description
        ? perks.description.map((desc) => desc).join(" and ")
        : perks.effects.map((effect) => effect.effect).join(" and ");

    return (
        <ContentBox
            header={<UmaAttributes attributes={attributes} image={image} />}
            headerProps={{ padding: matches ? "16px 24px" : "8px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            {uniqueEffects.length > 0 && (
                <Stack spacing={0.5} sx={{ width: "100%", maxWidth: "400px" }}>
                    <FlexBox
                        spacing={[0, 1]}
                        wrap
                        sx={{ justifyContent: "space-between" }}
                    >
                        <Text weight="highlight">Unique Perk</Text>
                        <InfoChip
                            title={`Lvl ${perks.unlock}`}
                            chipProps={{
                                height: "24px",
                                background: theme.appbar.backgroundColor.main,
                            }}
                        />
                    </FlexBox>
                    <Card
                        sx={{
                            p: 1,
                            backgroundColor: theme.background(0),
                        }}
                    >
                        <Text variant="body2" weight="highlight">
                            {uniqueEffects}
                        </Text>
                    </Card>
                </Stack>
            )}
        </ContentBox>
    );
}
