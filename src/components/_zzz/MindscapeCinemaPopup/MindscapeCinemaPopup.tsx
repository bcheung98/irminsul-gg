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

// Helper imports
import { range } from "@/utils";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { AttributeData } from "@/types";

export default function MindscapeCinemaPopup({
    attributes,
}: {
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const textColor = useTextColor(theme.text);
    const color =
        attributes.colors?.accent || textColor("zzz", attributes.element);

    const [sliderValue, setSliderValue] = useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const [gender, setGender] = useState<"M" | "F">("M");

    const marks = range(1, 3).map((level) => ({
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

    let imgURL = `zzz/mindscapes/${attributes.id}_${sliderValue}`;
    if (attributes.id === 1551) {
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
                    max={3}
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
            <Box sx={{ p: 2 }}>
                {attributes.id === 1551 && (
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
            <Image
                src={imgURL}
                style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    maxHeight: "1080px",
                    marginTop: "-32px",
                }}
            />
        </>
    );
}
