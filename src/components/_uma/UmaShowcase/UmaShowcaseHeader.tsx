// Component imports
import Image from "@/components/Image";
import UmaShowcaseAttributes from "./UmaShowcaseAttributes";
import UmaShowcaseRating from "./UmaShowcaseRating";

// MUI imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { ranks } from "@/data/uma/ranks";

// Type imports
import { DataArray } from "@/types/uma/calculator";
import { UmaCharacter } from "@/types/uma/character";

export default function UmaShowcaseHeader({
    character,
    stats,
    rating,
    rank,
}: {
    character: UmaCharacter;
    stats: DataArray;
    rating: number;
    rank: keyof typeof ranks;
}) {
    return (
        <Box
            sx={{
                backgroundImage:
                    "url(https://assets.irminsul.gg/v2/uma/_common/Background.png)",
                backgroundPosition: "50% 0%",
                backgroundSize: "110%",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
            }}
        >
            <Grid
                container
                sx={{
                    alignItems: "flex-start",
                    backdropFilter: "blur(8px)",
                    px: 2,
                    pt: 2,
                }}
            >
                <Grid size="auto">
                    <Grid container spacing={3}>
                        <Grid sx={{ height: "128px" }}>
                            <Image
                                src={`uma/characters/${character.id}`}
                                style={{
                                    width: "128px",
                                    height: "100%",
                                    scale: 1.25,
                                    transform: "translateY(8px)",
                                }}
                            />
                        </Grid>
                        <Grid>
                            <UmaShowcaseRating rating={rating} rank={rank} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size="auto">
                    <UmaShowcaseAttributes
                        character={character}
                        starLevel={stats[5]}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
