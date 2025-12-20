// Component imports
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Type imports
import { echoClass } from "@/data/wuwa/common";
import { EchoInfoProps } from "../EchoInfo";

export default function EchoAttributes({ echo, image }: EchoInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ width: "100%" }}>
            <FlexBox spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box sx={{ display: { xs: "block", md: "none" } }}>{image}</Box>
                <Stack spacing={1}>
                    <TextLabel
                        title={`${echo.displayName} (${echo.code})`}
                        titleProps={{ variant: matches ? "h4" : "h6" }}
                        textSpacing={0.5}
                    />
                    <FlexBox spacing={1} wrap>
                        <InfoChip title={`${echoClass[echo.rarity]} Class`} />
                        <InfoChip title={`Cost: ${echo.cost}`} />
                    </FlexBox>
                </Stack>
            </FlexBox>
            <Box
                sx={{
                    maxHeight: "128px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                }}
            >
                <Text variant="body2">
                    {
                        <SkillDescription
                            game="wuwa"
                            description={echo.description}
                        />
                    }
                </Text>
            </Box>
        </Stack>
    );
}
