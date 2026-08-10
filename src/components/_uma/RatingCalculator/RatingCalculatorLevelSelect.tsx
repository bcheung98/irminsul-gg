import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";

// MUI imports
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Helper imports
import { range } from "@/utils";
import { useRatingCalculatorStore } from "@/stores";

export default function RatingCalculatorLevelSelect({
    levels,
    index,
}: {
    levels: [number, number];
    index: number;
}) {
    const [start, stop] = levels;

    const { character, stats, setStat } = useRatingCalculatorStore();

    const [currentValue, setCurrentValue] = useState<number>(3);
    const handleChange = (event: SelectChangeEvent) => {
        const newValue = Number(event.target.value);
        setCurrentValue(() => newValue);
        setStat(index, newValue);
    };

    useEffect(() => {
        if (stats) {
            let newValue = stats[index];
            if (index === 5) {
                newValue = Math.max(start, newValue);
            }
            if (index === 6) {
                newValue = Math.min(stop, newValue);
            }
            setCurrentValue(newValue);
            setStat(index, newValue);
        }
    }, [character, JSON.stringify(stats)]);

    return (
        <Select
            value={currentValue.toString()}
            onChange={handleChange}
            input={<SelectInput />}
        >
            {range(start, stop).map((i) => (
                <MenuItem key={i} value={i}>
                    <Text variant="subtitle1">
                        {index === 5 ? `${i}★` : `Lv ${i}`}
                    </Text>
                </MenuItem>
            ))}
        </Select>
    );
}
