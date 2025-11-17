// Component imports
import VersionHighlights from "@/components/VersionHighlights";
import FarmingSchedule from "@/components/_genshin/FarmingSchedule";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { GenshinWeapon } from "@/types/genshin/weapon";

export default function GenshinHome({
    characters,
    weapons,
}: {
    characters: GenshinCharacter[];
    weapons: GenshinWeapon[];
}) {
    return (
        <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <VersionHighlights characters={characters} weapons={weapons} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <FarmingSchedule characters={characters} weapons={weapons} />
            </Grid>
        </Grid>
    );
}
