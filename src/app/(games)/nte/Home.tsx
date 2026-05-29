// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { NTECharacter, NTEWeapon, NTECartridge } from "@/types/nte";
import { BannerProps } from "@/types/banner";

export default function NTEHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: NTECharacter[];
    weapons: NTEWeapon[];
    equipment: NTECartridge[];
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
