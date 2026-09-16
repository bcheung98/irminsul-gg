// Component imports
import GearListRow from "./GearListRow";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { sortBy } from "@/utils";
import { gearSets, nonSetGear } from "@/data/endfield/gearSets";

// Type imports
import { EndfieldGear } from "@/types/endfield";

export default function GearList({ gear }: { gear: EndfieldGear[] }) {
    if (!gear.length) return null;

    const sortedGearSets = [...gearSets, ...nonSetGear].sort(
        (a, b) =>
            sortBy(Math.max(...a.levels), Math.max(...b.levels)) ||
            sortBy(b.id.toString().length, a.id.toString().length) ||
            a.displayName.localeCompare(b.displayName),
    );

    return (
        <Stack spacing={2} sx={{ pr: 8 }}>
            {sortedGearSets.map((set) => (
                <GearListRow key={set.id} gear={gear} set={set} />
            ))}
        </Stack>
    );
}
