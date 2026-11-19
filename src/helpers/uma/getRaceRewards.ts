import { raceRewardTables } from "@/data/uma/raceRewards";
import type { EventRewards } from "@/types/uma/event";

export function getRaceRewards(
    raceType: string,
    place = 1,
    postTracenKen = false,
): EventRewards[] {
    const table = raceRewardTables[raceType];

    if (!table) {
        return [];
    }

    const entries =
        postTracenKen && table.postTracenKen ? table.postTracenKen : table.base;

    if (table.fixed) {
        return entries[0]?.rewards ?? [];
    }

    return (
        entries.find(({ placement }) => {
            if (!placement) return false;

            const [start, end] = placement;
            return place >= start && (end === 0 || place <= end);
        })?.rewards ?? []
    );
}
