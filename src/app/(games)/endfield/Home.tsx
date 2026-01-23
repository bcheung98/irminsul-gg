// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { EndfieldCharacter, EndfieldWeapon } from "@/types/endfield";
import { BannerProps } from "@/types/banner";

export default function EndfieldHome({
    characters,
    weapons,
    banners,
}: {
    characters: EndfieldCharacter[];
    weapons: EndfieldWeapon[];
    banners: BannerProps;
}) {
    return (
        <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid size={12}>
                <CurrentBanners
                    characters={characters}
                    weapons={weapons}
                    banners={banners}
                />
            </Grid>
            <Grid size={{ xs: 12, lg: 12 }}>
                <VersionHighlights
                    characters={characters}
                    weapons={weapons}
                    equipment={[]}
                />
            </Grid>
        </Grid>
    );
}
