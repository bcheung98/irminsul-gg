// Component imports
import CurrentBanners from "@/components/CurrentBanners";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { BannerProps } from "@/types/banner";

export default function UmaHome({
    characters,
    weapons,
    banners,
}: {
    characters: UmaCharacter[];
    weapons: UmaSupport[];
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
        </Grid>
    );
}
