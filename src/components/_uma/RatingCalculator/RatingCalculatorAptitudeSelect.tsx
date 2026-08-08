import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Helper imports
import useStore, { useRatingCalculatorStore } from "@/stores";
import { ranks } from "@/data/uma/common";
import { formatAptitude } from "@/helpers/uma/formatTitle";

// Type imports
import { UmaCharacterAptitude } from "@/types/uma/character";
import { UmaRank } from "@/types/uma";

export default function RatingCalculatorAptitudeSelect({
    category,
    apt,
    value,
}: {
    category: keyof UmaCharacterAptitude;
    apt: string;
    value: UmaRank;
}) {
    const theme = useTheme();

    const aptitude = useStore(
        useRatingCalculatorStore,
        (state) => state.aptitude,
    );
    const { setAptitude } = useRatingCalculatorStore();

    const [currentValue, setCurrentValue] = useState<UmaRank>(value);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as UmaRank;
        setCurrentValue(newValue);
        setAptitude(category, apt, newValue);
    };

    useEffect(() => {
        if (aptitude) {
            const newValue = aptitude[category][apt] as UmaRank;
            setCurrentValue(newValue);
            setAptitude(category, apt, newValue);
        }
    }, [aptitude]);

    return (
        <Card
            sx={{
                p: "2px 8px",
                backgroundColor: theme.background(0),
                minWidth: "128px",
            }}
        >
            <FlexBox
                spacing={1}
                sx={{
                    justifyContent: "space-around",
                }}
            >
                <Text variant="body2" weight="highlight">
                    {formatAptitude(String(apt))}
                </Text>
                <Select
                    value={currentValue}
                    onChange={handleChange}
                    input={
                        <SelectInput
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "4px 0 0 8px",
                                },
                            }}
                        />
                    }
                >
                    {ranks.map((rank) => (
                        <MenuItem key={rank} value={rank}>
                            <Image
                                src={`uma/ranks/${rank}`}
                                alt={rank}
                                size={20}
                                responsive
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FlexBox>
        </Card>
    );
}
