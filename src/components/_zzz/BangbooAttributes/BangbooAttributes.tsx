import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { rarityMap } from "@/data/zzz/common";

// Type imports
import { AttributeData } from "@/types";

export default function BangbooAttributes({
    attributes,
    image,
}: {
    attributes: AttributeData;
    image: React.ReactNode;
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ width: "100%" }}>
            <FlexBox spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box sx={{ display: { xs: "block", md: "none" } }}>{image}</Box>
                <Stack spacing={1}>
                    <TextLabel
                        icon={`zzz/ranks/bangboo/${
                            rarityMap[attributes.rarity || 3]
                        }`}
                        iconProps={{ size: 48 }}
                        title={attributes.displayName}
                        titleProps={{ variant: matches ? "h4" : "h6" }}
                        textSpacing={0.5}
                    />
                </Stack>
            </FlexBox>
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
