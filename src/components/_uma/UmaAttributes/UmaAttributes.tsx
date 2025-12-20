// Component imports
import FlexBox from "@/components/FlexBox";
import RarityStars from "@/components/RarityStars";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Type imports
import { AttributeData } from "@/types";

export default function UmaAttributes({
    attributes,
    image,
}: {
    attributes: AttributeData;
    image: React.ReactNode;
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <Stack spacing={2}>
            <FlexBox spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box
                    sx={[
                        attributes.specialty
                            ? {
                                  display: {
                                      xs: "flex",
                                      sm: "none",
                                  },
                              }
                            : {
                                  display: {
                                      xs: "flex",
                                      md: "none",
                                  },
                              },
                    ]}
                >
                    {image}
                </Box>
                <Stack spacing={0.5}>
                    <TextLabel
                        title={
                            <Text
                                variant={matches ? "h6" : "subtitle1"}
                                weight="highlight"
                            >
                                {attributes.title}
                            </Text>
                        }
                        subtitle={
                            <Text
                                variant={matches ? "h4" : "h6"}
                                weight="highlight"
                            >
                                {attributes.displayName}
                            </Text>
                        }
                    />
                    {attributes.rarity && (
                        <RarityStars rarity={attributes.rarity} variant="h4" />
                    )}
                </Stack>
            </FlexBox>
        </Stack>
    );
}
