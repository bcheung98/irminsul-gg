// Component imports
import VersionHighlights from "@/components/VersionHighlights";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";

export default function EndfieldHome({
    characters,
    weapons,
}: {
    characters: EndfieldCharacter[];
    weapons: EndfieldWeapon[];
}) {
    return (
        <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid size={12}>
                <VersionHighlights
                    characters={characters}
                    weapons={weapons}
                    equipment={[]}
                />
            </Grid>
        </Grid>
    );
}
