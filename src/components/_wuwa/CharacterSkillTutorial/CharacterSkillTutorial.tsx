import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import SkillCard from "@/components/SkillCard";
import SkillDescription from "@/components/SkillDescription";
import Image from "@/components/Image";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Helper imports
import { range } from "@/utils";

// Type imports
import { WuWaSkillTutorial } from "@/types/wuwa/character";
import { AttributeData } from "@/types";

export default function CharacterSkillTutorial({
    attributes,
    tutorial,
}: {
    attributes: AttributeData;
    tutorial?: WuWaSkillTutorial;
}) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!tutorial) return null;

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                disableRipple
                sx={{
                    p: "4px 16px",
                    backgroundColor: theme.background(0, "dark"),
                    borderRadius: "4px",
                    borderColor: theme.border.color.primary,
                    "&:hover": {
                        backgroundColor: theme.background(0),
                    },
                }}
            >
                <Text variant="subtitle1">View Tutorial</Text>
            </Button>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                header="Forte Details"
                maxWidth="lg"
                fullWidth
                contentProps={{ padding: 0 }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        p: 2,
                        maxHeight: "80vh",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        {range(1, tutorial.imgCount || 1).map((index) => (
                            <Image
                                key={index}
                                src={`wuwa/tutorials/${attributes.id}_${index}`}
                                style={{ width: "100%", maxWidth: "600px" }}
                            />
                        ))}
                    </Stack>
                    {tutorial.description.length > 0 && (
                        <Stack spacing={1}>
                            <Text
                                weight="highlight"
                                sx={{ color: theme.text.wuwa.header }}
                            >
                                Basic Mechanics
                            </Text>
                            <SkillCard size={12}>
                                <Text
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    <SkillDescription
                                        game="wuwa"
                                        description={
                                            tutorial.description[0].description
                                        }
                                    />
                                </Text>
                            </SkillCard>
                        </Stack>
                    )}
                    {tutorial.combos.length > 0 && (
                        <Stack spacing={1}>
                            <Text
                                weight="highlight"
                                sx={{ color: theme.text.wuwa.header }}
                            >
                                Input Details
                            </Text>
                            {tutorial.combos.map((combo, index) => (
                                <SkillCard key={index} size={12}>
                                    <Text
                                        component="span"
                                        variant="subtitle1"
                                        weight="highlight"
                                        sx={{
                                            color: theme.text.description,
                                        }}
                                    >
                                        <SkillDescription
                                            game="wuwa"
                                            description={combo.description}
                                        />
                                    </Text>
                                </SkillCard>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </ContentDialog>
        </>
    );
}
