import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";

// MUI imports
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Helper imports
import { range } from "@/utils";
import useStore, { useRatingCalculatorStore } from "@/stores";

export default function RatingCalculatorLevelSelect({
    levels,
    index,
}: {
    levels: [number, number];
    index: number;
}) {
    const [start, stop] = levels;

    const stats = useStore(useRatingCalculatorStore, (state) => state.stats);
    const { setStat } = useRatingCalculatorStore();

    const [currentValue, setCurrentValue] = useState<number>(1);
    const handleChange = (event: SelectChangeEvent) => {
        const newValue = Number(event.target.value);
        setCurrentValue(() => newValue);
        setStat(index, newValue);
    };

    useEffect(() => {
        if (stats) {
            const newValue = stats[index];
            setCurrentValue(newValue);
            setStat(index, newValue);
        }
    }, [stats]);

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
