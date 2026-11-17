// Component imports
import Text from "@/components/Text";
import EventText from "../TrainingEvents/EventText";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import ContentBox from "@/components/ContentBox";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function SkillEvoConditions({
    conditions,
}: {
    conditions: EventRewards[][];
}) {
    const theme = useTheme();

    return (
        <Stack
            spacing={0}
            sx={{ borderRadius: theme.contentBox.border.radius }}
        >
            <ContentBox
                header="Conditions:"
                headerProps={{
                    textVariant: "body1",
                    dense: true,
                    padding: "8px 16px",
                }}
                contentProps={{ padding: 0 }}
            >
                <Stack
                    sx={{ backgroundColor: theme.background(0), px: 1 }}
                    divider={<Divider />}
                >
                    {conditions.map((condition, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {condition.map((con, i) => (
                                <Box key={i}>
                                    <EventText index={i} outcome={con} />
                                    {i < condition.length - 1 && (
                                        <Text
                                            variant="body2"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            or
                                        </Text>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Stack>
            </ContentBox>
        </Stack>
    );
}
