// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { HSRCharacter, HSRWeapon, HSRRelic } from "@/types/hsr";
import { BannerProps } from "@/types/banner";

export default function HSRHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: HSRCharacter[];
    weapons: HSRWeapon[];
    equipment: HSRRelic[];
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
                    equipment={equipment}
                />
            </Grid>
        </Grid>
    );
}
