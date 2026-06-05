import { useState } from "react";

// Component imports
import Slider from "@/components/Slider";
import Text from "@/components/Text";
import Image from "@/components/Image";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { range } from "@/utils";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { AttributeData } from "@/types";
import { EndfieldCharacterSnapshot } from "@/types/endfield/character";

export default function SnapshotPopup({
    snapshots,
    attributes,
}: {
    snapshots: EndfieldCharacterSnapshot[];
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const textColor = useTextColor(theme.text);
    const color =
        attributes.colors?.accent || textColor("endfield", attributes.element);

    const [sliderValue, setSliderValue] = useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const [gender, setGender] = useState<"M" | "F">("M");

    const marks = range(1, snapshots.length).map((level) => ({
        value: level,
        label: (
            <Text
                variant={sliderValue === level ? "subtitle1" : "subtitle2"}
                weight={sliderValue === level ? "highlight" : "primary"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === level ? 1 : 0.25,
                }}
            >
                {level}
            </Text>
        ),
    }));

    let imgURL = `endfield/snapshots/${attributes.id}_${sliderValue}`;
    if (attributes.id === 1003) {
        imgURL += gender;
    }

    return (
        <>
            <Box sx={{ width: { xs: "10%", md: "30vw" }, px: 2, pt: 2 }}>
                <Slider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={1}
                    max={snapshots.length}
                    onChange={handleSliderChange}
                    size={matches ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "200px",
                        ml: 2,
                        color,
                    }}
                />
            </Box>
            <Box sx={{ px: 2 }}>
                {attributes.id === 1003 && (
                    <ToggleButtons
                        value={gender}
                        onChange={(_, v) => v && setGender(v)}
                        exclusive
                        padding={4}
                        buttons={[
                            {
                                label: <Text>Male</Text>,
                                value: "M",
                            },
                            {
                                label: <Text>Female</Text>,
                                value: "F",
                            },
                        ]}
                    />
                )}
            </Box>
            <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
                <Text variant="h6" weight="highlight">
                    {snapshots[sliderValue - 1].name}
                </Text>
                <Text
                    variant="subtitle1"
                    sx={{ color: theme.text.description }}
                >
                    {snapshots[sliderValue - 1].description}
                </Text>
            </Stack>
            <Image
                src={imgURL}
                style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    maxHeight: "1080px",
                }}
            />
            <Box sx={{ p: 2 }}>
                <span>
                    <Text
                        variant="subtitle1"
                        weight="highlight"
                        component="span"
                        sx={{ color: theme.text.primary }}
                    >
                        Illustrator:
                    </Text>
                    <Text
                        variant="subtitle1"
                        component="span"
                        sx={{ color: theme.text.description }}
                    >{` ${snapshots[sliderValue - 1].illustrator}`}</Text>
                </span>
            </Box>
        </>
    );
}
