import { useState } from "react";

// Component imports
import SupportEffectRow from "./SupportEffectRow";
import ContentBox from "@/components/ContentBox";
import Text from "@/components/Text";
import Slider from "@/components/Slider";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { sortBy } from "@/utils";

// Type imports
import { UmaSupport } from "@/types/uma";

export default function SupportEffects({ support }: { support: UmaSupport }) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const { rarity, supportEffects } = support;

    const levels = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const [sliderValue, setSliderValue] = useState(rarity + 1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const effects = [...supportEffects].sort((a, b) =>
        sortBy(b.unlock, a.unlock)
    );

    const marks = levels.map((level, index) => ({
        value: index,
        label: (
            <Text
                variant={sliderValue === index ? "body1" : "body2"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === index ? 1 : 0.25,
                }}
            >
                {level}
            </Text>
        ),
    }));

    return (
        <ContentBox header="Support Effects">
            <Box
                sx={{
                    width: { xs: "75%", md: "30vw" },
                    mb: { xs: "0px", sm: "8px" },
                }}
            >
                <Slider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={0}
                    max={rarity + 5}
                    onChange={handleSliderChange}
                    size={matches ? "medium" : "small"}
                    sx={{
                        minWidth: "200px",
                        maxWidth: "400px",
                        ml: 2,
                    }}
                />
            </Box>
            <Stack spacing={1}>
                {effects.map((effect, index) => (
                    <SupportEffectRow
                        key={index}
                        effect={effect}
                        levels={levels}
                        sliderValue={sliderValue}
                        showDetails={!matches}
                    />
                ))}
            </Stack>
        </ContentBox>
    );
}
