// Component imports
import Text from "@/components/Text";
import EventText from "../TrainingEvents/EventText";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useUmaContext } from "@/context";
import ContentBox from "@/components/ContentBox";

export default function SkillEvoConditions({ skillID }: { skillID: number }) {
    const theme = useTheme();

    const { skills } = useUmaContext();
    const skill = skills.find((skill) => skill.id === skillID);

    if (!skill) {
        console.warn(`Could not find skill with ID ${skillID}`);
        return null;
    }

    if (!skill.evo) return null;

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
                    {skill.evo.evoConditions.map((condition, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {condition.map((con, i) => (
                                <Box key={i}>
                                    <EventText outcome={con} />
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
