export function formatSupportEffectValue(
    effect: string,
    value: string | number,
) {
    let res = value.toString();
    if (
        [
            "Friendship Bonus",
            "Mood Effect",
            "Training Effectiveness",
            "Race Bonus",
            "Fan Bonus",
            "Hint Frequency",
            "Event Recovery",
            "Event Effectiveness",
            "Failure Protection",
            "Energy Cost Reduction",
            "All Stats Bonus",
        ].includes(effect)
    ) {
        res += "%";
    }
    if (effect === "Hint Levels") {
        res = `Lvl ${value}`;
    }
    return res;
}
