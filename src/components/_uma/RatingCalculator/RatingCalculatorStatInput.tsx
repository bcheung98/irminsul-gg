import { useEffect, useState } from "react";

// Component imports
import NumberField from "@/components/NumberField";

// Helper imports
import useStore, { useRatingCalculatorStore } from "@/stores";
import { MIN_STAT_VALUE, MAX_STAT_VALUE } from "@/data/uma/ranks";

export default function RatingCalculatorStatInput({
    index,
    value,
}: {
    index: number;
    value: number;
}) {
    const stats = useStore(useRatingCalculatorStore, (state) => state.stats);
    const { setStat } = useRatingCalculatorStore();

    const [currentValue, setCurrentValue] = useState<number>(value);
    const handleInputChange = (newValue: number | null) => {
        if (newValue === null) return;
        newValue = Math.round(newValue);
        if (newValue < MIN_STAT_VALUE) {
            newValue = MIN_STAT_VALUE;
        }
        if (newValue > MAX_STAT_VALUE) {
            newValue = MAX_STAT_VALUE;
        }
        setCurrentValue(() => newValue);
        setStat(index, newValue);
    };

    useEffect(() => {
        if (stats) {
            const newValue = Math.round(stats[index]);
            setCurrentValue(newValue);
            setStat(index, newValue);
        }
    }, [stats]);

    return (
        <NumberField
            min={MIN_STAT_VALUE}
            max={MAX_STAT_VALUE}
            value={currentValue}
            smallStep={10}
            largeStep={50}
            size="small"
            onValueChange={handleInputChange}
        />
    );
}
