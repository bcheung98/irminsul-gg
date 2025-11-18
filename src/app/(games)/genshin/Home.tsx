// Component imports
import CurrentBanners from "@/components/CurrentBanners";
import VersionHighlights from "@/components/VersionHighlights";
import FarmingSchedule from "@/components/_genshin/FarmingSchedule";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import {
    GenshinArtifact,
    GenshinCharacter,
    GenshinWeapon,
} from "@/types/genshin";
import { BannerProps } from "@/types/banner";

export default function GenshinHome({
    characters,
    weapons,
    equipment,
    banners,
}: {
    characters: GenshinCharacter[];
    weapons: GenshinWeapon[];
    equipment: GenshinArtifact[];
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
            <Grid size={{ xs: 12, lg: 6 }}>
                <VersionHighlights
                    characters={characters}
                    weapons={weapons}
                    equipment={equipment}
                />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
                <FarmingSchedule characters={characters} weapons={weapons} />
            </Grid>
        </Grid>
    );
}
